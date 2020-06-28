"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "groupprivileges",
      [
        {
          groupId: 1,
          privilegeId: 1
        },
        {
          groupId: 1,
          privilegeId: 2
        },
        {
          groupId: 1,
          privilegeId: 3
        },
        {
          groupId: 1,
          privilegeId: 4
        },
        {
          groupId: 1,
          privilegeId: 5
        },
        {
          groupId: 1,
          privilegeId: 6
        },
        {
          groupId: 1,
          privilegeId: 7
        },
        {
          groupId: 1,
          privilegeId: 8
        },
        {
          groupId: 1,
          privilegeId: 9
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
