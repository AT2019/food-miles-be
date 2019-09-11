const readImage = require("../models/tesseractModel");
const { findCountry } = require("../utils/utils");

const selectCountryFromPhoto = (req, res, next) => {
  const body = req.body;
  readImage(body)
    .then(words => {
      res.status(200).send({ country: findCountry([words]) });
    })
    .catch(err => console.log(err));
};

module.exports = selectCountryFromPhoto;
