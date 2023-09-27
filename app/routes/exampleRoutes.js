const { exampleMiddleware } = require("../middleware");
const exampleController = require("../controllers/exampleController");
const userController = require("../controllers/usersController");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const router = require("express").Router();

  //data survey
  router.get(
    "/data/survey",
    exampleMiddleware.exampleMiddlewareFunction(),
    exampleController.refactoreMe1
  );
  router.post(
    "/data/survey",
    exampleMiddleware.exampleMiddlewareFunction(),
    exampleController.refactoreMe2
  );

  //auth
  router.post("/auth/login", userController.login);
  router.post(
    "/auth/register",
    exampleMiddleware.exampleMiddlewareFunction(),
    userController.register
  );

  app.use("/api", router);
};
