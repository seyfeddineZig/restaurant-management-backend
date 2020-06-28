"use strict";
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  Country.associate = function (models) {
    Country.hasMany(models.Department, {
      foreignKey: "countryId",
      as: "departments",
    });
    Country.hasMany(models.Bank, {
      foreignKey: "countryId",
      as: "banks",
    });
  };
  return Country;
};
