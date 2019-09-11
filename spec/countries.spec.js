const chai = require('chai');
const { expect } = chai;
const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../app');

describe('app', () => {
  describe('/api/countries', () => {
    it('GET status 200 - it responds with an array of country objects', () => {
      return request(app)
        .get('/api/countries')
        .expect(200)
        .then(({ body: { countries } }) => expect(countries).to.be.an('array'));
    });
    it('GET status 200 - countries objects should have the right properties', () => {
      return request(app)
        .get('/api/countries')
        .expect(200)
        .then(({ body: { countries } }) => {
          expect(countries.every(country => country._id)).to.be.true;
          expect(countries.every(country => country.capital)).to.be.true;
          expect(countries.every(country => country.distance)).to.be.true;
          expect(countries.every(country => country.latitude)).to.be.true;
          expect(countries.every(country => country.longitude)).to.be.true;
        });
    });
    it('POST status 201 - it responds with an array of country objects', () => {
      return request(app)
        .post('/api/countries')
        .send({
          country: 'Brasil',
          capital: 'Brasilia',
          distance: 5451,
          latitude: -15.826691,
          longitude: -47.921822
        })
        .expect(201)
        .then(({ body: { country } }) =>
          expect(country).to.include.keys(
            '_id',
            'capital',
            'distance',
            'latitude',
            'longitude'
          )
        );
    });
  });
});
