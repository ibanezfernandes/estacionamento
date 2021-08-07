const { verifySignUp } = require("../middleware");
const { verificar_recuperarSenha } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (server) {
  server.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  server.post(
    "/api/usuario/cadastro",
    [
      verifySignUp.checkDuplicateEmailOrPhone,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  server.post("/api/usuario/entrar", controller.signin);

  server.post("/api/usuario/validar",[
    verifySignUp.verificarUsuario
  ], controller.validarUsuario);

  server.get("/api/usuario/recuperarSenha/:cpf", [
    verificar_recuperarSenha.verificar_cpfVinculadoConta
  ], controller.recuperarSenha);

  server.post(
    "/api/usuario/editarUsuario",
    controller.editarDadosUsuario
  );

};