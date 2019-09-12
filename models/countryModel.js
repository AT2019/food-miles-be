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

module.exports = mongoose.model('Countries', countrySchema);
module.exports.fetchCountries = fetchCountries;
