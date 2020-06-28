"use strict";
module.exports = (sequelize, DataTypes) => {
  const PaymentCondition = sequelize.define(
    "PaymentCondition",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
  PaymentCondition.associate = function(models) {
    // associations can be defined here
  };
  return PaymentCondition;
};
