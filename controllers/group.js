const crtl = require("./controller");
const Group = require("../models").Group;
const GroupPrivilege = require("../models").GroupPrivilege;
const Privilege = require("../models").Privilege;
const db = require("../models");

module.exports = {
  findAll(req, res) {
    return Group.findAll({
      include: [
        {
          model: GroupPrivilege,
          as: "group_privileges",
          include: [
            {
              model: Privilege,
              as: "privilege"
            }
          ]
        }
      ]
    })
      .then(groups => res.status(200).send(groups))
      .catch(err => res.status(400).send(err));
  },
  findOne(req, res) {
    return Group.findByPk(req.params.id, {
      include: [
        {
          model: GroupPrivilege,
          as: "group_privileges",
          include: [
            {
              model: Privilege,
              as: "privilege"
            }
          ]
        }
      ]
    })
      .then(group => res.status(200).send(group))
      .catch(err => res.status(400).send(err));
  },
  create(req, res) {
    req.body.createdBy = req.authenticatedUser.id;
    req.body.updatedBy = req.authenticatedUser.id;
    return Group.create(req.body, {
      include: [
        {
          model: GroupPrivilege,
          as: "group_privileges"
        }
      ]
    })
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
  update(req, res) {
    db.sequelize
      .transaction()
      .then(t => {
        Group.findByPk(req.params.id).then(group => {
          if (!group)
            return res.status(404).send({
              message: "Ce groupe n'éxiste pas"
            });

          GroupPrivilege.destroy({
            where: { groupId: req.params.id },
            transaction: t
          })
            .then(resDestroy => {
              req.body.group_privileges.forEach(element => {
                element.groupId = req.params.id;
              });
              GroupPrivilege.bulkCreate(req.body.group_privileges, {
                transaction: t
              })
                .then(resCreatePrivileges => {
                  delete req.body.group_privileges;
                  req.body.updatedAt = crtl.dateNow();

                  if (req.hasOwnProperty("authenticatedUser")) {
                    req.body.updateBy = req.authenticatedUser.id;
                  }

                  Group.update(req.body, {
                    where: { id: req.params.id },
                    transaction: t
                  })
                    .then(resSave => {
                      t.commit();
                      return res.status(200).send("");
                    })
                    .catch(err => {
                      t.rollback();
                      return res.status(400).send(err);
                    });
                })
                .catch(err => {
                  t.rollback();
                  return res.status(400).send(err);
                });
            })
            .catch(err => {
              t.rollback();
              return res.status(400).send(err);
            });
        });
      })
      .catch(err => {
        t.rollback();
        return res.status(400).send(err);
      });
  },
  delete(req, res) {
    Group.findByPk(req.params.id)
      .then(group => {
        if (!group) {
          return res.status(404).send({
            message: "Ce groupe n'éxiste pas"
          });
        } else if (!group.deletable) {
          return res.status(401).send({
            message: "Vous ne pouvez pas supprimer ce groupe"
          });
        }
        group
          .destroy({
            where: { id: req.params.id }
          })
          .then(response => {
            res.status(200).send(response);
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
