const crtl = require("./controller");
const Category = require("../models").Category;
const CategoryParent = require("../models").Category;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Category.findAll({
      include: [
        {
          model: CategoryParent,
          as: "category_parent",
          required: false,
        },
      ],
    })
      .then((categories) => res.status(200).send(categories))
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  findOne(req, res) {
    return Category.findByPk(req.params.id)
      .then((category) => res.status(200).send(category))
      .catch((err) => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Category.create(req.body)
      .then((response) => {
        return Category.findByPk(response.id, {
          include: [
            {
              model: CategoryParent,
              as: "category_parent",
              required: false,
            },
          ],
        })
          .then((category) => res.status(200).send(category))
          .catch((err) => res.status(400).send(err));
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    Category.findByPk(req.params.id)
      .then((category) => {
        if (!category)
          return res.status(404).send({
            message: "Cette catégorie n'éxiste pas",
          });
        req.body.updatedAt = crtl.dateNow();
        Category.update(req.body, {
          where: { id: req.params.id },
        })
          .then((update) => {
            return res.status(200).send("");
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  },
  delete(req, res) {
    Category.findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: "Cette catégorie n'éxiste pas",
          });
        }
        Category.destroy({
          where: { id: req.params.id },
        })
          .then((response) => {
            res.status(200).send("");
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      })
      .catch((err) => {
        return res.status(400).send({
          error: err,
        });
      });
  },
};
