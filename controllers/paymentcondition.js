const crtl = require("./controller");
const PaymentCondition = require("../models").PaymentCondition;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return PaymentCondition.findAll()
      .then(PaymentConditions => res.status(200).send(PaymentConditions))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return PaymentCondition.findByPk(req.params.id)
      .then(PaymentCondition => res.status(200).send(PaymentCondition))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return PaymentCondition.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    PaymentCondition.findByPk(req.params.id)
      .then(PaymentCondition => {
        if (!PaymentCondition)
          return res.status(404).send({
            message: "Cette condition de règlement n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        PaymentCondition.update(req.body, {
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
    PaymentCondition.findByPk(req.params.id)
      .then(PaymentCondition => {
        if (!PaymentCondition) {
          return res.status(404).send({
            message: "Cette condition de règlement n'éxiste pas"
          });
        }
        PaymentCondition.destroy({
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
