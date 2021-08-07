'use strict';
const Usuario = require("../models/usuario");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Curriculos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      apresentacao: {
        type: Sequelize.STRING
      },
      estado_civil: {
        type: Sequelize.STRING
      },
      nacionalidade: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Curriculos');
  }
};