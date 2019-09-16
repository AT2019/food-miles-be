const tesseract = require("node-tesseract-ocr");
const sharp = require('sharp');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3
};

const readImage = ({ photo }) => {
  var img = new Buffer(photo, 'base64');
  return sharp(img)
    .resize(700, 450)
    .greyscale()
    .sharpen(2)
    .toFile("out2.png").then(() => {
      return tesseract
        .recognize("out2.png", config)
        .then(text => {
          console.log(text, "<-- in model");
          return text;
        })
        .catch(err => {
          console.log("error:", err);
        });
    }
    ).catch(err => console.log("sharp ", err));
};

module.exports = readImage;
