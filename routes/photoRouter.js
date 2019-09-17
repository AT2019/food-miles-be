const photoRouter = require("express").Router();
const selectCountryFromPhoto = require("../controllers/photoController.js");

photoRouter.route("/").post(selectCountryFromPhoto);

module.exports = photoRouter;
