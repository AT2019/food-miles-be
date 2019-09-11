const { expect } = require("chai");
const { findCountry } = require("./utils");

describe("find country of origin from the label", () => {
  it("takes an empty array and returns an error message", () => {
    const input = [""];
    const actual = findCountry(input);
    const expected = "No country identified";
    expect(actual).to.equal(expected);
  });
  it("takes a array of UK and returns UK", () => {
    const input = ["UK"];
    const actual = findCountry(input);
    const expected = "UK";
    expect(actual).to.equal(expected);
  });
  it("takes a array which does not contain a country and returns an error message", () => {
    const input = ["hello"];
    const actual = findCountry(input);
    const expected = "No country identified";
    expect(actual).to.equal(expected);
  });
  it("takes a array containing multiple words, one of which is a country and returns the country", () => {
    const input = ["hello UK"];
    const actual = findCountry(input);
    const expected = "UK";
    expect(actual).to.equal(expected);
  });
  it("takes a array containing multiple words, none of which is a country and returns the country", () => {
    const input = ["hello world"];
    const actual = findCountry(input);
    const expected = "No country identified";
    expect(actual).to.equal(expected);
  });
  xit("takes a array containing multiple words and more than one country and returns the countries in an array", () => {
    const input = [
      "UK contact details: Aria Consumer Careline 0845 600 6688 www. lurpak.couk Arla Foods Ltd, 4 Savannah Way, Leeds Valley Park, Leeds, S10 1AB Produced in Denmark. Arla Foods amba, DK-8260 Viby J."
    ];
    const actual = findCountry(input);
    const expected = ["UK", "Denmark."];
    expect(actual).to.eql(expected);
  });
  it("takes a array containing multiple words and more than one country and returns the countries that are not the UK", () => {
    const input = [
      "UK contact details: Aria Consumer Careline 0845 600 6688 www. lurpak.couk Arla Foods Ltd, 4 Savannah Way, Leeds Valley Park, Leeds, S10 1AB Produced in Denmark. Arla Foods amba, DK-8260 Viby J."
    ];
    const actual = findCountry(input);
    const expected = "Denmark";
    expect(actual).to.equal(expected);
  });
  it("takes a array containing U.K. and returns a string of UK", () => {
    const input = ["this is an arry containing U.K."];
    const actual = findCountry(input);
    const expected = "UK";
    expect(actual).to.equal(expected);
  });
  it("takes a array containing U.K. and another country and returns a string of UK", () => {
    const input = ["this is a string containing Denmark and U.K."];
    const actual = findCountry(input);
    const expected = "Denmark";
    expect(actual).to.equal(expected);
  });
});
