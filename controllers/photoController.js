// const fetchCountry = require("../models/photoModel.js");
const readImage = require("../models/tesseractModel");

const selectCountryFromPhoto = (req, res, next) => {
  console.log("<-- in controller");
  const body = req.body;
  readImage(body).then(words => {
    console.log(words);
  });
  //   fetchCountry()
  //     .then(country => {
  //       console.log(country);
  //       res.status(200).send({ country });
  //     })
  //     .catch(err => console.log(err));
};

module.exports = selectCountryFromPhoto;
