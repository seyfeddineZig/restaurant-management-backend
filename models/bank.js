"use strict";
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define(
    "Bank",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bic_swift: {
        type: DataTypes.STRING,
        unique: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {}
  );
  Bank.associate = function (models) {
    Bank.belongsTo(models.Country, {
      foreignKey: "countryId",
      as: "country",
    });
  };
  return Bank;
};
