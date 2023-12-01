const fs = require("fs");

const readFile = (path) => {
  return fs.readFileSync(path, { encoding: "utf8", flag: "r" });
};

module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  readFile,
};
