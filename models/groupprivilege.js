"use strict";
module.exports = (sequelize, DataTypes) => {
  const GroupPrivilege = sequelize.define(
    "GroupPrivilege",
    {
      groupId: DataTypes.INTEGER,
      privilegeId: DataTypes.INTEGER
    },
    {}
  );
  GroupPrivilege.associate = function(models) {
    GroupPrivilege.belongsTo(models.Group, {
      foreignKey: "groupId",
      onDelete: "CASCADE"
    });
    GroupPrivilege.belongsTo(models.Privilege, {
      foreignKey: "privilegeId",
      as: "privilege",
      onDelete: "CASCADE"
    });
  };
  return GroupPrivilege;
};
