"use strict";
module.exports = (sequelize, DataTypes) => {
  const provider = sequelize.define(
    "provider",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  provider.associate = function (models) {
    // associations can be defined here
  };
  return provider;
};
