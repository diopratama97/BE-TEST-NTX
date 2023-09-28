const { exampleMiddleware, cacheMiddleware } = require("../middleware");
const exampleController = require("../controllers/exampleController");
const userController = require("../controllers/usersController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");

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

  //get Data from fetch api
  router.get(
    "/data/fetch-api",
    cacheMiddleware.cache,
    exampleController.getData
  );

  router.use("/docs", swaggerUi.serve);
  router.get("/docs", swaggerUi.setup(swaggerDocument));

  app.use("/api", router);
};
