const mongoose = require('mongoose');

const { app } = require('../app');
const User = require('../models/userModel');
const Country = require('../models/countryModel');
const Shopping = require('../models/shoppingModel');

beforeEach(done => {
  const dropCountries = Country.deleteMany({});
  const dropUsers = User.deleteMany({});
  const dropShoppings = Shopping.deleteMany({});

  Promise.all([dropCountries, dropUsers, dropShoppings]).then(() => {
    const addUser = new User({
      name: 'John Doe',
      email: 'test@gmail.com',
      password: 'hashedPassword'
    }).save();
    const addScotland = new Country({
      _id: 'Scotland',
      capital: 'Edinburgh',
      distance: 55,
      latitude: 66,
      longitude: 66
    }).save();
    const addSouthAfrica = new Country({
      _id: 'South Africa',
      capital: 'Cape Town',
      distance: 55,
      latitude: 66,
      longitude: 66
    }).save();
    const addShoppingList = new Shopping({
      email: 'test@test.com',
      items: [
        {
          food_category: 'chilled',
          latitude: 16.0,
          longitude: 33,
          distance: 4390,
          country: 'Spain'
        },
        {
          food_category: 'meat',
          latitude: 16.0,
          longitude: 33,
          distance: 4190,
          country: 'Italy'
        }
      ]
    });
    Promise.all([addUser, addScotland, addSouthAfrica, addShoppingList]).then(
      () => {
        done();
      }
    );
  });
});

after(done => {
  mongoose.connection.close();
  done();
});
