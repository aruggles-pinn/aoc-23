console.log("aoc 2023 day 01");

const fs = require("fs").promises;

async function readInputFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}

function parseLine(line) {
  const numbers = line.match(/[0-9]/g) || [];
  const [a] = numbers;
  const [b] = numbers.reverse();
  return parseInt(`${a}${b}`);
}

async function main() {
  const input = await readInputFile("./test/input.txt");
  const data = input.split("\n").map(parseLine);
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  console.log("Part 1: ", sum);
}

const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function mapEarliestNumber(line) {
  const keys = Object.keys(numbers);
  const indexes = keys.map((key) => [line.indexOf(key), key]);
  const [earliest] = indexes
    .filter(([index]) => index > -1)
    .sort(([a], [b]) => a - b);

  if (!earliest) return line;
  return line.replace(earliest[1], numbers[earliest[1]]);
}

function mapLatestNumber(line) {
  const reversed = line.split("").reverse().join("");
  const keys = Object.keys(numbers).map((key) =>
    key.split("").reverse().join("")
  );
  const indexes = keys.map((key) => [reversed.indexOf(key), key]);
  const [earliest] = indexes
    .filter(([index]) => index > -1)
    .sort(([a], [b]) => a - b);

  if (!earliest) return line;
  return reversed
    .replace(earliest[1], numbers[earliest[1]])
    .split("")
    .reverse()
    .join("");
}

async function main2() {
  const input = await readInputFile("./test/input.txt");
  const data = input
    .split("\n")
    .map(mapEarliestNumber)
    .map(mapLatestNumber)
    .map(parseLine);
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  console.log("Part 1: ", sum);
}

main();
main2();
