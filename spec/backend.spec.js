const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../app");
// const photo = "photos/tomatoes.jpg";
const photo = "photos/orangejuice.jpg";

describe("/photo", () => {
  it("establishes the test connection", () => {
    return request(app)
      .get("/api/photo")
      .send({ photo })
      .expect(200)
      .then(({ body }) => {
        console.log(body, "<-- in backend spec");
      });
  }).timeout(5000);
  xit("sends an error message asking the customer to input the country manually if it is not in the database", () => {
    return request(app)
      .get("/api/photo")
      .send({ photo })
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).to.equal("No country identified");
      });
  }).timeout(5000);
});
