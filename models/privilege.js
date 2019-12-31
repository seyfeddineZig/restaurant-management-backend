"use strict";
module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define(
    "Privilege",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: DataTypes.TEXT,
      group: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Privilege.associate = function(models) {
    Privilege.hasMany(models.GroupPrivilege, {
      foreignKey: "privilegeId",
      as: "privilege_groups"
    });
  };
  return Privilege;
};
