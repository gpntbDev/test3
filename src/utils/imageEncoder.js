const fs = require("fs");
const Buffer = require("buffer");

module.exports.base64Encode = function (file) {
  const bitmap = fs.readFileSync(file);

  return bitmap.toString("base64");
};

