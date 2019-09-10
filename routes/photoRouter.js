const photoRouter = require("express").Router();
const selectCountryFromPhoto = require("../controllers/photoController.js");

photoRouter.route("/").get(selectCountryFromPhoto);

module.exports = photoRouter;
