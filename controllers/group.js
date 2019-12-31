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
  create(req, res) {
    let data = req.body;
    if (req.hasOwnProperty("authenticatedUser")) {
      data.createdBy = req.authenticatedUser.id;
      data.updatedBy = req.authenticatedUser.id;
    }
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
        Group.findByPk(req.params.id, {
          include: [{ model: GroupPrivilege, as: "group_privileges" }]
        }).then(group => {
          if (!group) return res.status(404).send("not found");
          group.set(req.body);
          group
            .save({
              transaction: t
            })
            .then(responseSave => {
              GroupPrivilege.destroy({
                where: { groupId: req.params.id },
                transaction: t
              }).then(responseDestroy => {
                GroupPrivilege.create(req.body.group_privileges, {
                  include: [{ model: Group }],
                  transaction: t
                }).then(res => {
                  t.commit();
                  return res.status(200).send("");
                });
              });
            });
        });
      })
      .catch(err => {
        t.rollback();
        return res.status(400).send(err);
      });
  }
};
