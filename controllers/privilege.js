const Privilege = require("../models").Privilege;

module.exports = {
  findAll(req, res) {
    return Privilege.findAll()
      .then(privileges => res.status(200).send(privileges))
      .catch(err => res.status(400).send(err));
  }
};
