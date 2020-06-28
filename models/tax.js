"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define(
    "Tax",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: { type: DataTypes.TEXT, allowNull: true },
      rate: { type: DataTypes.INTEGER, allowNull: false },
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
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};
