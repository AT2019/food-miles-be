// const fetchCountry = require("../models/photoModel.js");

const selectCountryFromPhoto = (req, res, next) => {
  console.log("in controller");
  fetchCountry()
    .then(country => {
      console.log(country);
      res.status(200).send({ country });
    })
    .catch(err => console.log(err));
};

module.exports = selectCountryFromPhoto;
