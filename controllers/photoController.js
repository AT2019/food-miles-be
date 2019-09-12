const readImage = require("../models/tesseractModel");
const { findCountry } = require("../utils/utils");
const { getCountryData } = require("../api");

const selectCountryFromPhoto = (req, res, next) => {
  const body = req.body;
  readImage(body)
    .then(words => {
      return findCountry([words]);
    })
    .then(country => {
      if (country === "No country identified") {
        return Promise.reject({ status: 404, msg: "No country identified" });
      } else return res.status(200).send(getCountryData(country));
    })
    .catch(next);
};

module.exports = selectCountryFromPhoto;
