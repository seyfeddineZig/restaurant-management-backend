const userController = require("../controllers").user;
const groupController = require("../controllers").group;
const privilegeController = require("../controllers").privilege;
const categoryController = require("../controllers").category;
const taxController = require("../controllers").tax;
const paymentconditionController = require("../controllers").paymentcondition;
const paymentmethodController = require("../controllers").paymentmethod;
const currencyController = require("../controllers").currency;
const countryController = require("../controllers").country;
const departmentController = require("../controllers").department;
const addressController = require("../controllers").address;
const bankController = require("../controllers").bank;
const customerCategoryController = require("../controllers").customercategory;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "welcome to Api !"
    })
  );

  //Utilisateurs
  app.post("/api/user", userController.create);
  app.post("/api/auth", userController.auth);
  app.get("/api/profile", userController.profile);

  //Groupes d'utilisateurs
  app.get("/api/group/index", groupController.findAll);
  app.get("/api/group/:id", groupController.findOne);
  app.post("/api/group/create", groupController.create);
  app.put("/api/group/update/:id", groupController.update);
  app.delete("/api/group/delete/:id", groupController.delete);
  app.get("/api/privileges/index", privilegeController.findAll);

  //Categories
  app.get("/api/category/index", categoryController.findAll);
  app.get("/api/category/:id", categoryController.findOne);
  app.post("/api/category/create", categoryController.create);
  app.put("/api/category/update/:id", categoryController.update);
  app.delete("/api/category/delete/:id", categoryController.delete);

  //Taxes
  app.get("/api/tax/index", taxController.findAll);
  app.get("/api/tax/:id", taxController.findOne);
  app.post("/api/tax/create", taxController.create);
  app.put("/api/tax/update/:id", taxController.update);
  app.delete("/api/tax/delete/:id", taxController.delete);

  //Condition de règlement
  app.get("/api/paymentcondition/index", paymentconditionController.findAll);
  app.get("/api/paymentcondition/:id", paymentconditionController.findOne);
  app.post("/api/paymentcondition/create", paymentconditionController.create);
  app.put(
    "/api/paymentcondition/update/:id",
    paymentconditionController.update
  );
  app.delete(
    "/api/paymentcondition/delete/:id",
    paymentconditionController.delete
  );

  //Méthode de règlement
  app.get("/api/paymentmethod/index", paymentmethodController.findAll);
  app.get("/api/paymentmethod/:id", paymentmethodController.findOne);
  app.post("/api/paymentmethod/create", paymentmethodController.create);
  app.put("/api/paymentmethod/update/:id", paymentmethodController.update);
  app.delete("/api/paymentmethod/delete/:id", paymentmethodController.delete);

  //Devise
  app.get("/api/currency/index", currencyController.findAll);
  app.get("/api/currency/:id", currencyController.findOne);
  app.post("/api/currency/create", currencyController.create);
  app.put("/api/currency/update/:id", currencyController.update);
  app.delete("/api/currency/delete/:id", currencyController.delete);

  //Pay
  app.get("/api/country/index", countryController.findAll);
  app.get("/api/country/:id", countryController.findOne);
  app.post("/api/country/create", countryController.create);
  app.put("/api/country/update/:id", countryController.update);
  app.delete("/api/country/delete/:id", countryController.delete);

  //Departement
  app.get("/api/department/index", departmentController.findAll);
  app.get("/api/department/:id", departmentController.findOne);
  app.post("/api/department/create", departmentController.create);
  app.put("/api/department/update/:id", departmentController.update);
  app.delete("/api/department/delete/:id", departmentController.delete);

  //Adresse
  app.get("/api/address/index", addressController.findAll);
  app.get("/api/address/:id", addressController.findOne);
  app.post("/api/address/create", addressController.create);
  app.put("/api/address/update/:id", addressController.update);
  app.delete("/api/address/delete/:id", addressController.delete);

  //Banque
  app.get("/api/bank/index", bankController.findAll);
  app.get("/api/bank/:id", bankController.findOne);
  app.post("/api/bank/create", bankController.create);
  app.put("/api/bank/update/:id", bankController.update);
  app.delete("/api/bank/delete/:id", bankController.delete);

  //customerCategories
  app.get("/api/customercategory/index", customerCategoryController.findAll);
  app.get("/api/customercategory/:id", customerCategoryController.findOne);
  app.post("/api/customercategory/create", customerCategoryController.create);
  app.put(
    "/api/customercategory/update/:id",
    customerCategoryController.update
  );
  app.delete(
    "/api/customercategory/delete/:id",
    customerCategoryController.delete
  );
};
