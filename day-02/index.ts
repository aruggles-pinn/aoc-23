// Path: day-02/index.ts
import * as Utils from "../utils/index.ts";

const initial = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseLine(line: string) {
  const [id, round] = line.replace(/Game /, "").split(/:/);

  const matches = round.match(/(\d+)\s*(red|green|blue)/g);

  if (!matches) return 0;

  const { red, green, blue } = matches.reduce((acc, curr) => {
    const [value, color] = curr.split(" ");
    return acc[color] > parseInt(value)
      ? acc
      : { ...acc, [color]: parseInt(value) };
  }, initial);

  if (red > initial.red || green > initial.green || blue > initial.blue)
    return 0;
  else return parseInt(id);
}

async function main() {
  const value = Utils.sum(
    (await Utils.readLines("./day-02/input.txt")).map(parseLine)
  );
  console.log("🚀 ~ file: index.ts:31 ~ main ~ value:", value);
}

const initial2 = {
  red: 0,
  green: 0,
  blue: 0,
};

function parseLine2(line: string) {
  const [_, round] = line.replace(/Game /, "").split(/:/);

  const matches = round.match(/(\d+)\s*(red|green|blue)/g);

  if (!matches) return 0;

  const { red, green, blue } = matches.reduce((acc, curr) => {
    const [value, color] = curr.split(" ");
    return acc[color] > parseInt(value)
      ? acc
      : { ...acc, [color]: parseInt(value) };
  }, initial2);

  return red * green * blue;
}

async function main2() {
  const value = Utils.sum(
    (await Utils.readLines("./day-02/input.txt")).map(parseLine2)
  );
  console.log("🚀 ~ file: index.ts:31 ~ main ~ value:", value);
}

main();
main2();
