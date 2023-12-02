console.log("aoc 2023 day 01");

import { readLines, sum } from "../utils/index.ts";

function parseLine(line) {
  const [a] = line.match(/[0-9]/g) || [];
  const [b] = (line.match(/[0-9]/g) || []).reverse();
  return parseInt(`${a}${b}`);
}

async function main() {
  const value = sum((await readLines("./day-01/input.txt")).map(parseLine));
  console.log("Part 1: ", value);
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
  const value = sum(
    (await readLines("./day-01/input.txt"))
      .map(mapEarliestNumber)
      .map(mapLatestNumber)
      .map(parseLine)
  );
  console.log("Part 2: ", value);
}

main();
main2();
