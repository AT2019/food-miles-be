const mongoose = require('mongoose');

const { app } = require('../app');
const User = require('../models/userModel');
const Country = require('../models/countryModel')

beforeEach((done) => {
  console.log('beforeEach start')
  const dropCountries = Country.deleteMany({});
  const dropUsers = User.deleteMany({});
  Promise.all([dropCountries, dropUsers])
    .then(() => {
      console.log('beforeEach cleared data')
      const addUser = new User({
        name: 'John Doe',
        email: 'test@gmail.com',
        password: 'hashedPassword'
      })
        .save();
      const addScotland = new Country({
        _id: 'Scotland',
        capital: 'Edinburgh',
        distance: 55,
        latitude: 66,
        longitude: 66
      })
        .save();
      const addSouthAfrica = new Country({
        _id: 'South Africa',
        capital: 'Cape Town',
        distance: 55,
        latitude: 66,
        longitude: 66
      })
        .save();
      Promise.all([addUser, addScotland, addSouthAfrica])
        .then(() => {
          console.log('beforeEach added data')
          done()
        });
    });
});

after((done) => {
  mongoose.connection.close();
  done();
})
