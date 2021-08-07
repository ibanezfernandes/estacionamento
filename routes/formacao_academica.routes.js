const controller = require('../controllers/curriculo/formacao_academica.controller');
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post(
        '/api/registrarFormacaoAcademica',
        [authJwt.verifyToken],
        controller.registrarFormacoesAcademicas
      );

      app.get(
        '/api/getMinhasFormacoes',
        [authJwt.verifyToken],
        controller.getMinhasFormacoes
      );

      app.put(
        '/api/updateFormacao/:idFormacao',
        [authJwt.verifyToken],
        controller.updateFormacao
      );

      app.delete(
        '/api/deleteFormacao/:idFormacao',
        [authJwt.verifyToken],
        controller.deleteFormacao
      );
};