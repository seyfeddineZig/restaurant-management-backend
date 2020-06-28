"use strict";
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    "Currency",
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      description: DataTypes.TEXT,
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      conversionValue: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      deletable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER
    },
    {}
  );
  Currency.associate = function(models) {
    // associations can be defined here
  };
  return Currency;
};
