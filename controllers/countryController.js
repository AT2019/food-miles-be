const { fetchCountries } = require('../models/countryModel');
const Countries = require('../models/countryModel');

exports.getCountries = (req, res, next) => {
  fetchCountries().then(countries => res.status(200).send({ countries }));
};

//ADD country

exports.addCountry = async (req, res, next) => {
  // Create a new country
  const newCountry = new Countries({
    _id: req.body.country,
    capital: req.body.capital,
    distance: req.body.distance,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  try {
    const country = await newCountry.save();
    res.status(201).send({ country });
  } catch (err) {
    res.status(400).send(err);
  }
};
