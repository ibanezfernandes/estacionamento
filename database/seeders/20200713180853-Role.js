'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => await queryInterface.bulkInsert(
    'Roles',
      [
        {
          nome: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Moderador',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: 'Usuario',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
  ),
  down: async (queryInterface, Sequelize) => await queryInterface.bulkDelete('Roles', null, {}),
};
