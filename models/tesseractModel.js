const tesseract = require("node-tesseract-ocr");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3
};

const readImage = ({ photo }) => {
  return tesseract
    .recognize(photo, config)
    .then(text => {
      return text;
    })
    .catch(err => {
      console.log("error:", err);
    });
};

module.exports = readImage;
