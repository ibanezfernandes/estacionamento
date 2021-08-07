const controller = require('../controllers/curriculo/curriculo.controller');
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
        '/api/registrarCurriculo',
        [authJwt.verifyToken],
        controller.registrarCurriculo
      );

      app.get(
        '/api/getCurriculoPeloUserId/:curriculoId',
        controller.getCurriculoPeloUserId
      );

      app.get(
        '/api/getMeuCurriculo',
        [authJwt.verifyToken],
        controller.getMeuCurriculo
      );

      app.put(
        '/api/atualizarCurriculoBase/:curriculoId',
        [authJwt.verifyToken],
        controller.updateCurriculoBase
      );

      app.put(
        '/api/atualizarCurriculoCompleto/:curriculoId',
        [authJwt.verifyToken],
        controller.updateCurriculoCompleto
      )

      app.delete(
        '/api/deleteCurriculo/:curriculoId',
        [authJwt.verifyToken],
        controller.deleteCurriculo
      );
};