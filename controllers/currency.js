const crtl = require("./controller");
const Currency = require("../models").Currency;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Currency.findAll()
      .then(currencies => res.status(200).send(currencies))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Currency.findByPk(req.params.id)
      .then(currency => res.status(200).send(currency))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Currency.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Currency.findByPk(req.params.id)
      .then(currency => {
        if (!currency)
          return res.status(404).send({
            message: "Cette méthode de règlement n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        if (!req.body.deletable) req.body.active = true;
        Currency.update(req.body, {
          where: { id: req.params.id }
        })
          .then(update => {
            return res.status(200).send("");
          })
          .catch(err => {
            return res.status(400).send(err);
          });
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  },
  delete(req, res) {
    Currency.findByPk(req.params.id)
      .then(currency => {
        if (!currency) {
          return res.status(404).send({
            message: "Cette méthode de règlement n'éxiste pas"
          });
        }
        Currency.destroy({
          where: { id: req.params.id }
        })
          .then(response => {
            res.status(200).send("");
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        return res.status(400).send({
          error: err
        });
      });
  }
};
