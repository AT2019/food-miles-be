const chai = require('chai');
const { expect } = chai;
const request = require('supertest');
const { app } = require('../app');

describe('app', () => {
  describe('/api/shopping', () => {
    it('GET status 200 - it responds with an array of prev shopping list object', () => {
      return request(app)
        .get('/api/prevShopping')
        .expect(200)
        .then(({ body }) => {
          expect(body.shoppings).to.be.an('array');
        });
    });
    it('GET status 200 - it responds with a prev shopping list object', () => {
      return request(app)
        .post('/api/prevShopping')
        .send({
          email: 'test@test.com',
          items: [
            {
              food_category: 'chilled',
              latitude: 16.0,
              longitude: 33,
              distance: 4390
            },
            {
              food_category: 'meat',
              latitude: 16.0,
              longitude: 33,
              distance: 4190
            }
          ]
        })
        .then(({ body }) => {
          const id = body.shoppingList._id;
          return id;
        })
        .then(id => {
          return request(app)
            .get(`/api/prevShopping/${id}`)
            .expect(200)
            .then(({ body: { shoppingList } }) => {
              expect(shoppingList).to.be.an('object');
            });
        });
    });
    it('GET status 200 - it responds with an array of prev shopping list objects', () => {
      return request(app)
        .post('/api/prevShopping')
        .send({
          email: 'test@test.com',
          items: [
            {
              food_category: 'frozen',
              latitude: 16.0,
              longitude: 33,
              distance: 1390
            },
            {
              food_category: 'meat',
              latitude: 16.0,
              longitude: 33,
              distance: 1190
            }
          ]
        })
        .then(() => {
          return request(app)
            .get('/api/prevShopping?email=test@test.com')
            .expect(200)
            .then(({ body: { shoppings } }) => {
              expect(shoppings).to.be.an('array');
            });
        });
    });
    it('POST status 201 - it responds with a shoppinglist object', () => {
      return request(app)
        .post('/api/prevShopping')
        .send({
          email: 'test@test.com',
          items: [
            {
              food_category: 'chilled',
              latitude: 16.0,
              longitude: 33,
              distance: 4390
            },
            {
              food_category: 'meat',
              latitude: 16.0,
              longitude: 33,
              distance: 4190
            }
          ]
        })
        .expect(201)
        .then(({ body }) => expect(body.shoppingList).to.be.an('object'));
    });
    it('DELETE status 204 - responds with 204 if success', () => {
      return request(app)
        .post('/api/prevShopping')
        .send({
          email: 'test@test.com',
          items: [
            {
              food_category: 'chilled',
              latitude: 16.0,
              longitude: 33,
              distance: 4390
            },
            {
              food_category: 'meat',
              latitude: 16.0,
              longitude: 33,
              distance: 4190
            }
          ]
        })
        .then(({ body }) => {
          const id = body.shoppingList._id;
          return id;
        })
        .then(id => {
          return request(app)
            .delete(`/api/prevShopping/${id}`)
            .expect(204);
        });
    });
  });
});
