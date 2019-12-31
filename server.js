const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const models = require("./models");
const groupController = require("./controllers").group;

models.sequelize
  .sync()
  .then(function() {
    console.log("that Db is Okay !");
  })
  .catch(function(err) {
    console.log(err, "Something wrong with this db !");
  });

//mongoose.connect("enter your mongodb url here");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//check if user is logged in
//&& if user has privilege
app.use(function(req, res, next) {
  let token = req.headers.token; //token
  let where;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err && req.path !== "/api/login")
      return res.status(401).json({
        title: "unauthorized",
        err: err
      });

    if (req.path === "/api/login") {
      where = { email: req.body.email };
    } else {
      where = { id: decoded.userId };
    }
    models.User.findOne({ where: where })
      .then(responseUser => {
        if (responseUser != null) {
          req.authenticatedUser = responseUser.dataValues;
          let pathArray = req.path.split("/");
          pathArray.splice(0, 2);
          let privilege =
            (typeof pathArray[1] !== typeof undefined
              ? pathArray[1] + "_"
              : "") + pathArray[0];
          models.Privilege.findOne({
            where: {
              name: privilege
            }
          })
            .then(responsePrivilege => {
              if (responsePrivilege != null) {
                models.GroupPrivilege.findOne({
                  where: {
                    groupId: responseUser.dataValues.groupId,
                    privilegeId: responsePrivilege.dataValues.id
                  }
                })
                  .then(responseGroupPrivilege => {
                    if (responseGroupPrivilege != null) {
                      next();
                    } else {
                      return res.status(401).json({
                        title: "no permission",
                        description: responsePrivilege.dataValues.description
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                next();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return res.status(404).json({
            title: "not found"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
});

require("./routes")(app);
//routes
/*app.post("/signup", (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: "error",
        error: "email in use"
      });
    }
    return res.status(200).json({
      title: "signup success"
    });
  });
});*/
/*app.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err
      });
    if (!user) {
      return res.status(401).json({
        title: "user not found",
        error: "invalid credentials"
      });
    }
    //incorrect password
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        tite: "login failed",
        error: "invalid credentials"
      });
    }
    //IF ALL IS GOOD create a token and send to frontend
    let token = jwt.sign({ userId: user._id }, "secretkey");
    return res.status(200).json({
      title: "login sucess",
      token: token
    });
  });
});*/

//grabbing user info
/*app.get("/user", (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized"
      });
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "user grabbed",
        user: {
          email: user.email,
          name: user.name
        }
      });
    });
  });
});*/
const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) return console.log(err);
  console.log("server running on port " + port);
});
