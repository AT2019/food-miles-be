const { expect } = require("chai");
const request = require("supertest");
const app = require("../App");

describe("app", () => {
  describe("/photo", () => {
    it("establishes the test connection", () => {
      return request(app)
        .get("/api/photo")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
        });
    });
  });
});
