const axios = require("axios");

const baseUrl =
  "http://ec2-3-15-224-160.us-east-2.compute.amazonaws.com:3003/api/countries/";

const db = require("./config/configuration");

exports.getCountryData = country => {
  return axios.get(`${baseUrl}${country}`).then(response => {
    return response.data;
  });
};
