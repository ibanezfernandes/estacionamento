const controller = require('../controllers/curriculo/experiencia_profisional.controller');
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
        '/api/registrarExperienciaProfissional',
        [authJwt.verifyToken],
        controller.registrarExperienciasProfissionais
      );

      app.get(
        '/api/getMinhasExperiencias',
        [authJwt.verifyToken],
        controller.getMinhasExperiencias
      );

      app.put(
        '/api/updateExperiencia/:idExperiencia',
        [authJwt.verifyToken],
        controller.updateExperienciaProfissional
      );

      app.delete(
        '/api/deleteExperiencia/:idExperiencia',
        [authJwt.verifyToken],
        controller.deleteExperienciaProfissional
      );
};