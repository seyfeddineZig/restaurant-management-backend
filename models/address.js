"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      road: { type: DataTypes.TEXT, allowNull: false },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  Address.associate = function (models) {
    Address.belongsTo(models.Department, {
      foreignKey: "departmentId",
      as: "department",
    });
  };
  return Address;
};
