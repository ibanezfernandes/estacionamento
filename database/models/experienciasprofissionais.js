'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExperienciasProfissionais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExperienciasProfissionais.belongsTo(models.Curriculo, {
        foreignKey: 'curriculoId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  ExperienciasProfissionais.init({
    empresa: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY,
    data_termino: DataTypes.DATEONLY,
    trabalho_atual: DataTypes.BOOLEAN,
    cargo: DataTypes.STRING,
    curriculoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExperienciasProfissionais',
  });
  return ExperienciasProfissionais;
};