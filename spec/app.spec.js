const chai = require('chai');
// const chaiSorted = require('chai-sorted');
const { expect } = chai;
const mongoose = require('mongoose');
// chai.use(chaiSorted);
const request = require('supertest');
const { app } = require('../app');

describe('APP', () => {
  //   console.log(mongoose.connection, 'MONGOOSE');
  beforeEach(() => mongoose.connection.db.dropDatabase());
  //   after(() => {
  //     mongoose.connection.close();
  //   });
  describe('/api', () => {});
  describe('/user/register', () => {
    it('POST status 201, responds with an object', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John BEST',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .expect(201)
        .then(({ body: { savedUser } }) =>
          expect(savedUser).to.include.keys('name', 'email', 'password')
        );
    });
    it('ERROR 400 - POST, if username is less than 6 characters it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal(
            '"name" length must be at least 6 characters long'
          )
        );
    });
    it('ERROR 400 - POST, if username is empty it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: '',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"name" is not allowed to be empty')
        );
    });
    it('ERROR 400 - POST, if email is invalid it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'JohnBET',
          email: 'test3hotmail.com',
          password: 'pass123'
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"email" must be a valid email')
        );
    });
    it('ERROR 400 - POST, if email is empty it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'JohnBET',
          email: '',
          password: 'pass123'
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"email" is not allowed to be empty')
        );
    });
    it('ERROR 400 - POST, if password is less than 6 charaters it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'JohnBET',
          email: 'test@gmail.com',
          password: 'pass'
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal(
            '"password" length must be at least 6 characters long'
          )
        );
    });
  });
  describe('/user/login', () => {
    it('POST status 200 - if email and password matches it responds OK', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John BEST',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .then(() => {
          return request(app)
            .post('/api/user/login')
            .send({
              email: 'test3@hotmail.com',
              password: 'pass123'
            })
            .then(token => expect(token.headers).to.include.keys('auth-token'));
        });
    });
    it('ERROR status 400 - if email is invalid,it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John BEST',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .then(() => {
          return request(app)
            .post('/api/user/login')
            .send({
              email: 'test3hotmail.com',
              password: 'pass123'
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal('"email" must be a valid email')
            );
        });
    });
    it('ERROR status 400 - if email doesn`t match,it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John BEST',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .then(() => {
          return request(app)
            .post('/api/user/login')
            .send({
              email: 'test@hotmail.com',
              password: 'pass123'
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal("Email doesn't exist")
            );
        });
    });
    it('ERROR status 400 - if password doesn`t match,it responds with an error message', () => {
      return request(app)
        .post('/api/user/register')
        .send({
          name: 'John BEST',
          email: 'test3@hotmail.com',
          password: 'pass123'
        })
        .then(() => {
          return request(app)
            .post('/api/user/login')
            .send({
              email: 'test3@hotmail.com',
              password: 'passs123'
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal('Invalid password')
            );
        });
    });
  });
});
