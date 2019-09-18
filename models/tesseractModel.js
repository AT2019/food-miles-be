//const tesseract = require("node-tesseract-ocr");
const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();
const sharp = require('sharp');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3
};

const readImage = ({ photo }) => {
  //const filename = "out.png"; // replace with random filename to support multi user
  const img = new Buffer(photo.base64, 'base64');
  return sharp(img)
    .resize(700, 450)
    .greyscale()
    .sharpen(2)
    .toBuffer()
    .then((data) => {
      return worker
        .recognize(data)//, config)
        .then(({ text }) => {
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
