const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(server) {
  server.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  server.get("/api/test/all", controller.allAccess);

  server.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  server.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  server.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  server.get(
    "/api/getUsers",
    controller.getAllUsers
  );
};