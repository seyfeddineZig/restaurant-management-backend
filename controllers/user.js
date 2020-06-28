const User = require("../models").User;
const Group = require("../models").Group;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create(req, res) {
    return User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      mobile: req.body.mobile,
      adress: req.body.adress,
      groupId: req.body.groupId,
      password: bcrypt.hashSync(req.body.password, 10)
    })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err));
  },
  profile(req, res) {
    let token = req.headers.token;
    jwt.verify(token, "secretkey", (err, decoded) => {
      return User.findOne({ where: { id: decoded.userId } })
        .then(user => {
          if (user !== null) {
            return res.status(200).json({
              user
            });
          } else {
            return res.status(401).json({
              message: "Ce nom d'utilisateur n'éxiste pas"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            message: err
          });
        });
    });
  },
  auth(req, res) {
    return User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user !== null) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
              message: "Veuillez vérifier vos informations"
            });
          }
          let token = jwt.sign({ userId: user.dataValues.id }, "secretkey");
          return res.status(200).json({
            title: "login sucess",
            token: token
          });
        } else {
          return res.status(401).json({
            message: "Veuillez vérifier vos informations"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        });
      });
  }
};
