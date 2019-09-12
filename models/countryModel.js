const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  _id: {
    type: String
  },
  capital: {
    type: String
  },
  distance: {
    type: Number
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  }
});
const countryModel = mongoose.model('countries', countrySchema);

const fetchCountries = () => {
  return countryModel.find().then(countries => countries);
};

const fetchCountryById = ({ countryId }) => {
  const formatedCountry = countryId
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());
  return countryModel.findOne({ _id: formatedCountry }).then(country => {
    if (!country) {
      return Promise.reject({ status: 400, msg: 'Bad Request' });
    } else return country;
  });
};

module.exports = mongoose.model('Countries', countrySchema);
module.exports.fetchCountries = fetchCountries;
module.exports.fetchCountryById = fetchCountryById;
