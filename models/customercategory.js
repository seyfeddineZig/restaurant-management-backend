"use strict";
module.exports = (sequelize, DataTypes) => {
  const customerCategory = sequelize.define(
    "customerCategory",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
      parentId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  customerCategory.associate = function(models) {
    // associations can be defined here
    customerCategory.belongsTo(models.customerCategory, {
      foreignKey: "parentId",
      as: "customer_category_parent"
    });
  };
  return customerCategory;
};
