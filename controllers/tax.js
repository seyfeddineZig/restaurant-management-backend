const crtl = require("./controller");
const Tax = require("../models").Tax;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Tax.findAll()
      .then(taxes => res.status(200).send(taxes))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Tax.findByPk(req.params.id)
      .then(Tax => res.status(200).send(Tax))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Tax.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Tax.findByPk(req.params.id)
      .then(Tax => {
        if (!Tax)
          return res.status(404).send({
            message: "Cette taxe n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        Tax.update(req.body, {
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
    Tax.findByPk(req.params.id)
      .then(Tax => {
        if (!Tax) {
          return res.status(404).send({
            message: "Cette taxe n'éxiste pas"
          });
        }
        Tax.destroy({
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
