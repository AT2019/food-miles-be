const countryRouter = require('express').Router();
const {
  getCountries,
  addCountry,
  getCountryById
} = require('../controllers/countryController');

countryRouter
  .route('/')
  .get(getCountries)
  .post(addCountry);

countryRouter.route('/:countryId').get(getCountryById);

module.exports = countryRouter;
