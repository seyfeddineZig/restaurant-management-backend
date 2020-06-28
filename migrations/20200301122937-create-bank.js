"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Banks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      bic_swift: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      countryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Countries",
          key: "id",
          as: "countryId"
        }
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Banks");
  }
};
