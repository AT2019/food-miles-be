const chai = require("chai");
const { expect } = chai;
const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../app");
const { photo } = require("../photos/base64pic.js");


describe("APP", () => {
  // beforeEach(() => mongoose.connection.db.dropDatabase());
  describe("/api", () => {
    it("ERROR status 404 when wrong path given", () => {
      return request(app)
        .get("/api/usr")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Page not found");
        });
    });
  });
  describe("/api/user", () => {
    it("GET status 200 - it responds with an array of users", () => {
      return request(app)
        .get("/api/user")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).to.be.an("Array");
        });
    });
    it("GET status 200 - the user object has all the properties", () => {
      return request(app)
        .get("/api/user")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users.every(user => user._id)).to.be.true;
          expect(users.every(user => user.password)).to.be.true;
          expect(users.every(user => user.email)).to.be.true;
          expect(users.every(user => user.date)).to.be.true;
        });
    });
  });
  describe("/api/user/:email", () => {
    it("GET status 200 - it responds with an user object", () => {
      return request(app)
        .get("/api/user/test@gmail.com")
        .expect(200)
        .then(({ body: { user } }) => expect(user).to.be.an("object"));
    });
    it("GET status 200 - the user object has all the properties", () => {
      return request(app)
        .get("/api/user/test@gmail.com")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.include.keys("_id", "password", "date", "email");
        });
    });
    it("ERROR status 404 - if email doesn`t exist, it responds with 404 and an error message", () => {
      return request(app)
        .get("/api/user/test@gml.com")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Email Not Found");
        });
    });
    it("DELETE status 204 - responds with 204 if success", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John TEST",
          email: "test@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .delete("/api/user/test@hotmail.com")
            .expect(204);
        });
    });
    it("ERROR - DELETE status 404 - responds with 404 and an error message if no success", () => {
      return request(app)
        .delete("/api/user/t@hotmail.com")
        .expect(404)
        .then(({ body: { msg } }) => expect(msg).to.equal("Email Not Found"));
    });
    it("PATCH status 204 - responds with 204", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "Paul TEST",
          email: "test1@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .patch("/api/user/test1@hotmail.com")
            .send({ name: "Paul John Test" })
            .expect(204);
        });
    });
    it("ERROR - PATCH status 404 - responds with 404 and an error message", () => {
      return request(app)
        .patch("/api/user/testing1@hotmail.com")
        .send({ name: "Paul John Test" })
        .expect(404)
        .then(({ body: { msg } }) => expect(msg).to.equal("Email Not Found"));
    });
  });
  describe("/user/register", () => {
    it("POST status 201, responds with an object", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .expect(201)
        .then(({ body: { savedUser } }) =>
          expect(savedUser).to.include.keys("name", "email", "password")
        );
    });
    it("ERROR 400 - POST, if username is less than 6 characters it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal(
            '"name" length must be at least 6 characters long'
          )
        );
    });
    it("ERROR 400 - POST, if username is empty it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"name" is not allowed to be empty')
        );
    });
    it("ERROR 400 - POST, if email is invalid it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "JohnBET",
          email: "test3hotmail.com",
          password: "pass123"
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"email" must be a valid email')
        );
    });
    it("ERROR 400 - POST, if email is empty it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "JohnBET",
          email: "",
          password: "pass123"
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal('"email" is not allowed to be empty')
        );
    });
    it("ERROR 400 - POST, if password is less than 6 charaters it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "JohnBET",
          email: "test@gmail.com",
          password: "pass"
        })
        .expect(400)
        .then(({ body: { msg } }) =>
          expect(msg).to.equal(
            '"password" length must be at least 6 characters long'
          )
        );
    });
  });
  describe("/user/login", () => {
    it("POST status 200 - if email and password matches it responds OK", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test3@hotmail.com",
              password: "pass123"
            })
            .then(token => expect(token.headers).to.include.keys("auth-token"));
        });
    });
    it("ERROR status 400 - if email is invalid,it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test3hotmail.com",
              password: "pass123"
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal('"email" must be a valid email')
            );
        });
    });
    it("ERROR status 400 - if email doesn`t match,it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test@hotmail.com",
              password: "pass123"
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal("Email doesn't exist")
            );
        });
    });
    it("ERROR status 400 - if password doesn`t match,it responds with an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test3@hotmail.com",
              password: "passs123"
            })
            .then(({ body: { msg } }) =>
              expect(msg).to.equal("Invalid password")
            );
        });
    });
  });
  describe("/posts", () => {
    it("GET status 200 - if successfully logged in, it responds with 200 and auth-key is available on header", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test3@hotmail.com",
              password: "pass123"
            })
            .then(() => {
              return request(app)
                .get("/api/posts")
                .set(
                  "auth-token",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDc3YjBhMzJiMTBiYjU5MmNlZTM3YzQiLCJpYXQiOjE1NjgxMjUxMDV9.Zz3EvfFpiSM4VsRM1MToUPHATtvuu3jPDWvbpOArNQI"
                )
                .expect(200);
              // .then(body => expect(body.text).to.include.keys('_id'));
            });
        });
    });
    it("GET status 200 - if not logged in, it responds with 401 and an error message", () => {
      return request(app)
        .post("/api/user/register")
        .send({
          name: "John BEST",
          email: "test3@hotmail.com",
          password: "pass123"
        })
        .then(() => {
          return request(app)
            .post("/api/user/login")
            .send({
              email: "test3@hotmail.com",
              password: "pass123"
            })
            .then(() => {
              return request(app)
                .get("/api/posts")
                .expect(401)
                .then(({ body: { msg } }) =>
                  expect(msg).to.equal("Access Denied")
                );
            });
        });
    });
  });
});
