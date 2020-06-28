const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const models = require("./models");
const groupController = require("./controllers").group;

models.sequelize
  .sync()
  .then(function () {
    console.log("that Db is Okay !");
  })
  .catch(function (err) {
    console.log(err, "Something wrong with this db !");
  });

//mongoose.connect("enter your mongodb url here");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//check if user is logged in
//&& if user has privilege
app.use(function (req, res, next) {
  let token = req.headers.token; //token
  let where;
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err && req.path !== "/api/auth")
      return res.status(401).json({
        title: "unauthorized",
        message: err,
      });

    if (req.path === "/api/auth") {
      where = { email: req.body.email };
    } else {
      where = { id: decoded.userId };
    }
    models.User.findOne({ where: where })
      .then((responseUser) => {
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
              name: privilege,
            },
          })
            .then((responsePrivilege) => {
              if (responsePrivilege != null) {
                models.GroupPrivilege.findOne({
                  where: {
                    groupId: responseUser.dataValues.groupId,
                    privilegeId: responsePrivilege.dataValues.id,
                  },
                })
                  .then((responseGroupPrivilege) => {
                    if (responseGroupPrivilege != null) {
                      next();
                    } else {
                      return res.status(401).json({
                        title: "no permission",
                        description: responsePrivilege.dataValues.description,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                next();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return res.status(401).json({
            message: "veuillez vérifier vos informations",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

require("./routes")(app);
const port = process.env.PORT || 5500;

http.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server running on port " + port);
});

io.on("connection", function (socket) {
  //Groupes d'utilisateurs
  socket.on("CREATE/UPDATE", function ({ row, moduleName }) {
    io.emit("CREATE/UPDATE", { row, moduleName });
  });

  socket.on("CREATE/UPDATE_SPECIFIC_ATTRIBUTE", function ({
    row,
    moduleName,
    id,
    attribute,
  }) {
    io.emit("CREATE/UPDATE_SPECIFIC_ATTRIBUTE", {
      row,
      moduleName,
      id,
      attribute,
    });
  });
  socket.on("DELETE", function ({ id, moduleName, moduleLabel }) {
    io.emit(moduleName + "_DELETE", { id, moduleName, moduleLabel });
  });
});
