const readImage = require("../models/tesseractModel");
const { findCountry } = require("../utils/utils");
const { getCountryData } = require("../api");

const selectCountryFromPhoto = (req, res, next) => {
  const body = req.body;
  if (body.text) {
    getCountryData(body.text).then(country => {
      res.status(200).send(country);
    });
  } else {
    readImage(body)
      .then(words => {
        return findCountry([words]);
      })
      .then(country => {
        if (country === "No country identified") {
          return Promise.reject({ status: 404, msg: "No country identified" });
        } else
          getCountryData(country).then(data => {
            res.status(200).send(data);
          });
      })
      .catch(next);
  }
};

module.exports = selectCountryFromPhoto;
