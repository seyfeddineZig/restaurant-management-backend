"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("GroupPrivileges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Groups",
          key: "id",
          as: "groupId"
        }
      },
      privilegeId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Privileges",
          key: "id",
          as: "privilegeId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("GroupPrivileges");
  }
};
