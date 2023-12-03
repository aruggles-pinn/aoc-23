const fs = require("fs");
const { argv } = require("process");
const dotenv = require("dotenv");
dotenv.config();

const [p, s, ...args] = argv;

const day = args[0];
const dayPath = "day-" + args[0].toString().padStart(2, "0");

// try to make the directory with name day-<day> if it doesn't exist already
try {
  fs.mkdirSync(`./${dayPath}`);
} catch (err) {
  console.log("Failed to create directory");
}

// try to make the input.txt file if it doesn't exist already
try {
  if (fs.existsSync(`./${dayPath}/input.txt`)) {
    console.log("input.txt already exists");
  } else {
    fetch(`https://adventofcode.com/2023/day/${day}/input`, {
      method: "GET",
      headers: {
        cookie: `session=${process.env.AOC_SESSION}`,
        "content-type": "text/plain",
      },
    })
      .then((res) => res.text())
      .then((data) => {
        fs.writeFileSync(`./${dayPath}/input.txt`, data);
      });
  }
} catch (err) {
  console.log("Failed to create input.txt");
}

// try to make the index.js file if it doesn't exist already
const template = `// Path: ${dayPath}/index.ts
import * as Utils from "../utils/index.ts";

async function main() {
  const lines = await Utils.readLines("./${dayPath}/input.txt");
  console.log("🚀 ~ file: index.js:62 ~ main ~ input", lines);
}

main();
`;

try {
  // check if index.ts exists
  if (fs.existsSync(`./${dayPath}/index.ts`)) {
    console.log("index.ts already exists");
  } else {
    fs.writeFileSync(`./${dayPath}/index.ts`, template);
  }
} catch (err) {
  console.log("Failed to create index.ts");
}
