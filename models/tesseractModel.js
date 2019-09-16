const tesseract = require("node-tesseract-ocr");
const sharp = require('sharp');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3
};

const readImage = ({ photo }) => {
  const filename = "out.png"; // replace with random filename to support multi user
  const img = new Buffer(photo, 'base64');
  return sharp(img)
    .resize(700, 450)
    .greyscale()
    .sharpen(2)
    .toFile(filename).then(() => {
      return tesseract
        .recognize(filename, config)
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
