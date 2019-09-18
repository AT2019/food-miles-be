const readImage = require("../models/tesseractModel");
const { findCountry } = require("../utils/utils");
const { fetchCountryById } = require("../models/countryModel")

const selectCountryFromPhoto = (req, res, next) => {
  const body = req.body;
  readImage(body)
    .then(words => {
      return findCountry([words]);
    })
    .then(country => {
      if (country === "No country identified") {
        return Promise.reject({ status: 404, msg: "No country identified" });
      } else {
        fetchCountryById(country).then((data) => {
          const result = {
            msg: country,
            data
          }
          res.status(200).send(result);
        });
      }
    })
    .catch(next);
};

module.exports = selectCountryFromPhoto;
