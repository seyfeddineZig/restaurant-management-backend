"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: true, unique: true },
      mobile: { type: DataTypes.STRING, allowNull: true, unique: true },
      adress: { type: DataTypes.TEXT, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {}
  );
  User.associate = function(models) {
    User.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE"
    });
  };
  return User;
};
