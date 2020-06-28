const crtl = require("./controller");
const Bank = require("../models").Bank;
const Department = require("../models").Department;
const Country = require("../models").Country;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Bank.findAll()
      .then(banks => res.status(200).send(banks))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Bank.findByPk(req.params.id)
      .then(bank => res.status(200).send(bank))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Bank.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Bank.findByPk(req.params.id)
      .then(bank => {
        if (!bank)
          return res.status(404).send({
            message: "Cette banque n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        Bank.update(req.body, {
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
    Bank.findByPk(req.params.id)
      .then(bank => {
        if (!bank) {
          return res.status(404).send({
            message: "Cette banque n'éxiste pas"
          });
        }
        Bank.destroy({
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
