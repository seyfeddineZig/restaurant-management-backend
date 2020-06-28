const crtl = require("./controller");
const Department = require("../models").Department;
const Country = require("../models").Country;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Department.findAll()
      .then(departments => res.status(200).send(departments))
      .catch(err => {
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Department.findByPk(req.params.id)
      .then(department => res.status(200).send(department))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Department.create(req.body)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Department.findByPk(req.params.id)
      .then(department => {
        if (!department)
          return res.status(404).send({
            message: "Ce département n'éxiste pas"
          });
        req.body.updatedAt = crtl.dateNow();
        Department.update(req.body, {
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
    Department.findByPk(req.params.id)
      .then(department => {
        if (!department) {
          return res.status(404).send({
            message: "Ce département n'éxiste pas"
          });
        }
        Department.destroy({
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
