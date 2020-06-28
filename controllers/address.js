const crtl = require("./controller");
const Address = require("../models").Address;
const Department = require("../models").Department;
const Country = require("../models").Country;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Address.findAll()
      .then(addresses => res.status(200).send(addresses))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Address.findByPk(req.params.id)
      .then(address => res.status(200).send(address))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Address.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Address.findByPk(req.params.id)
      .then(address => {
        if (!address)
          return res.status(404).send({
            message: "Cette adresse n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        Address.update(req.body, {
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
    Address.findByPk(req.params.id)
      .then(address => {
        if (!address) {
          return res.status(404).send({
            message: "Cette adresse n'éxiste pas"
          });
        }
        Address.destroy({
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
