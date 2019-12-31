"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("privileges", "group", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("privileges", "group")]);
  }
};
