"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: DataTypes.TEXT,
      deletable: {
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
  Group.associate = function(models) {
    Group.hasMany(models.GroupPrivilege, {
      foreignKey: "groupId",
      as: "group_privileges"
    });
    Group.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "created_by",
      constraints: false
    });
    Group.belongsTo(models.User, {
      foreignKey: "updatedBy",
      as: "updated_by",
      constraints: false
    });
  };
  return Group;
};
