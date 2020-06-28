const crtl = require("./controller");
const Country = require("../models").Country;
const Department = require("../models").Department;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Country.findAll()
      .then(countries => res.status(200).send(countries))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Country.findByPk(req.params.id)
      .then(country => res.status(200).send(country))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Country.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Country.findByPk(req.params.id)
      .then(country => {
        if (!country)
          return res.status(404).send({
            message: "Ce pays n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        Country.update(req.body, {
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
    Country.findByPk(req.params.id)
      .then(country => {
        if (!country) {
          return res.status(404).send({
            message: "Ce pays n'éxiste pas"
          });
        }
        Country.destroy({
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
