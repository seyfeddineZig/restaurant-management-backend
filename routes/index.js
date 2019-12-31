const userController = require("../controllers").user;
const groupController = require("../controllers").group;
const privilegeController = require("../controllers").privilege;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "welcome to Api !"
    })
  );

  app.post("/api/user", userController.create);
  app.post("/api/login", userController.login);
  app.get("/api/group/index", groupController.findAll);
  app.post("/api/group/create", groupController.create);
  app.put("/api/group/update/:id", groupController.update);
  app.get("/api/privileges/index", privilegeController.findAll);
};
