'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormacaoAcademica extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FormacaoAcademica.belongsTo(models.Curriculo, {
        foreignKey: "curriculoId",
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  FormacaoAcademica.init({
    instituicao: DataTypes.STRING,
    curso: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY,
    data_conclusao: DataTypes.DATEONLY,
    curriculoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FormacoesAcademicas',
  });
  return FormacaoAcademica;
};