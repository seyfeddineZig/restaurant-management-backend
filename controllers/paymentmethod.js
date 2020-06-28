const crtl = require("./controller");
const PaymentMethod = require("../models").PaymentMethod;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return PaymentMethod.findAll()
      .then(PaymentMethods => res.status(200).send(PaymentMethods))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return PaymentMethod.findByPk(req.params.id)
      .then(PaymentMethod => res.status(200).send(PaymentMethod))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return PaymentMethod.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    PaymentMethod.findByPk(req.params.id)
      .then(PaymentMethod => {
        if (!PaymentMethod)
          return res.status(404).send({
            message: "Cette méthode de règlement n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        PaymentMethod.update(req.body, {
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
    PaymentMethod.findByPk(req.params.id)
      .then(PaymentMethod => {
        if (!PaymentMethod) {
          return res.status(404).send({
            message: "Cette méthode de règlement n'éxiste pas"
          });
        }
        PaymentMethod.destroy({
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
