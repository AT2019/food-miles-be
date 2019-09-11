const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../app");
const { photo } = require("../photos/base64pic.js");

describe("/photo", () => {
  it.only("establishes the test connection", () => {
    return request(app)
      .get("/api/photo")
      .send({ photo })
      .expect(200)
      .then(({ body }) => {
        console.log(body, "<-- in app spec");
      });
  });
});
