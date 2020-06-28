"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "currencies",
      [
        {
          id: 1,
          name: "DZD",
          description: "Dinar algérien",
          symbol: "DZD",
          conversionValue: 1,
          deletable: false,
          active: true
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
