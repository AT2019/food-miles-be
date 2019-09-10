const { expect } = require("chai");
const request = require("supertest");
const app = require("../App");
const { photo } = require("../photos/base64pic.js");

describe("app", () => {
  describe("/photo", () => {
    it("establishes the test connection", () => {
      return request(app)
        .get("/api/photo")
        .send({ photo })
        .expect(200)
        .then(({ body }) => {
          console.log(body, "<-- in app spec");
        });
    });
  });
});
