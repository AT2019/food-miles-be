const apiRouter = require("express").Router();
const photoRouter = require("./photoRouter.js");

apiRouter.use("/photo", photoRouter);

module.exports = apiRouter;
