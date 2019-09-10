const { TesseractWorker } = require("tesseract.js");
const worker = new TesseractWorker();
const fs = require("fs");
const util = require("util");
const sharp = require("sharp");

const readImage = filename => {
  sharp(filename)
    .resize(700, 450)
    .greyscale()
    .sharpen(2)
    .toBuffer()
    .then(data => {
      worker
        .recognize(data)
        .progress(progress => {
          //console.log(progress, "Prog");
        })
        .then(({ text }) => {
          console.log(text, "Result");
          fs.writeFile("dip.txt", text, err => {
            if (err) console.log(err);
          });
          worker.terminate();
        })
        .catch(err => {
          console.log(err);
        });
    });
};

module.exports = readImage;
