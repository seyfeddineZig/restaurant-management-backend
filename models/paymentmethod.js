"use strict";
module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define(
    "PaymentMethod",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER
    },
    {}
  );
  PaymentMethod.associate = function(models) {
    // associations can be defined here
  };
  return PaymentMethod;
};
