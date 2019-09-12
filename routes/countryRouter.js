const countryRouter = require('express').Router();
const {
  getCountries,
  addCountry
} = require('../controllers/countryController');

countryRouter
  .route('/')
  .get(getCountries)
  .post(addCountry);

module.exports = countryRouter;
