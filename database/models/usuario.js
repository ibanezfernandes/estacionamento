'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasOne(models.Curriculo, {
        foreignKey: 'usuarioId',
        as: 'meu_curriculo',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      Usuario.belongsToMany(models.Role, {
        through: "Usuario_Roles",
        foreignKey: "userId",
        otherKey: "roleId"
      });
    };
  };
  Usuario.init({
    nome_completo: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    usuarioAtivo:DataTypes.BOOLEAN,
    senhaTemporaria:DataTypes.BOOLEAN,
    senha: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};