"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "seyf eddine",
          email: "seyfeddine",
          phone: "+00000000000",
          mobile: "+0000000000",
          password:
            "$2b$10$NhH8A3UpEP/ATt/znmFaSeoAg/IKYMcxPb5YVqnYFWLQPlodig6em",
          groupId: 1,
          createdBy: 0,
          updatedBy: 0
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
