"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "privileges",
      [
        {
          id: 1,
          name: "index_group",
          description: "Consulter la liste des groupes d''utilisateurs",
          group: "Groupe d''utilisateur"
        },
        {
          id: 2,
          name: "create_group",
          description: "Ajouter un groupe d''utilisateurs",
          group: "Groupe d''utilisateur"
        },
        {
          id: 3,
          name: "update_group",
          description: "Modifier un groupe d''utilisateurs",
          group: "Groupe d''utilisateur"
        },
        {
          id: 4,
          name: "delete_group",
          description: "Supprimer un groupe d''utilisateurs",
          group: "Groupe d''utilisateur"
        },
        {
          id: 5,
          name: "index_user",
          description: "Consulter la liste des utilisateurs",
          group: "Utilisateur"
        },
        {
          id: 6,
          name: "create_user",
          description: "Ajouter un utilisateur",
          group: "Utilisateur"
        },
        {
          id: 7,
          name: "update_user",
          description: "Modifier un utilisateur",
          group: "Utilisateur"
        },
        {
          id: 8,
          name: "delete_user",
          description: "Supprimer un utilisateur",
          group: "Utilisateur"
        },
        {
          id: 9,
          name: "auth",
          description: "Ouvrir une session",
          group: "Utilisateur"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
