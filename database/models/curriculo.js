'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curriculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Curriculo.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'autor',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      Curriculo.hasMany(models.FormacoesAcademicas, {
        foreignKey: 'curriculoId',
        as: 'formacoes',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'  
      });

      Curriculo.hasMany(models.ExperienciasProfissionais, {
        foreignKey: 'curriculoId',
        as: 'experiencias',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    };
  };
  Curriculo.init({
    apresentacao: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curriculo',
  });
  return Curriculo;
};