// Path: day-05/index.ts
import * as Utils from "../utils/index.ts";

type Range = {
  source: number;
  destination: number;
  length: number;
};

type Transform = {
  from: string;
  to: string;
  ranges: Range[];
};

const parseRange = (line: string): Range => {
  const [destination, source, length] = line
    .split(/ +/g)
    .map((n) => parseInt(n.trim()));

  return {
    source,
    destination,
    length,
  };
};

const parseTransform = (line: string): Transform => {
  const [locationsStr, ...rangesStr] = line.split("\n");

  const [from, to] = locationsStr.replaceAll(" map:", "").split("-to-");

  const ranges = rangesStr.map(parseRange);

  return { from, to, ranges };
};

const parseSeeds = (line?: string) => {
  if (!line) return [];

  return line
    .replaceAll("seeds: ", "")
    .split(/ +/g)
    .map((n) => parseInt(n.trim()));
};

async function main() {
  const data = await Utils.readText("./day-05/input.txt");
  const lines = data.split("\n\n");

  const seeds = parseSeeds(lines.shift());
  const transforms = lines.map(parseTransform);

  const playSeed = (seed: number) => {
    let result = seed;
    for (let j = 0; j < transforms.length; j++) {
      const transform = transforms[j];
      for (let i = 0; i < transform.ranges.length; i++) {
        const range = transform.ranges[i];

        if (
          result >= range.source &&
          result <= range.source + range.length - 1
        ) {
          const offset = Math.abs(result - range.source);
          result = range.destination + offset;
          break;
        }
      }
      console.log("🚀 ~ file: index.ts:56 ~ playSeed ~ result:", result);
    }
    return result;
  };

  const result = seeds.map(playSeed);
  console.log("🚀 ~ file: index.ts:67 ~ main ~ result:", Math.min(...result));
}

// main();

const parseSeeds2 = (line?: string) => {
  if (!line) return [];

  return line
    .replaceAll("seeds: ", "")
    .split(/ +/g)
    .map((n) => parseInt(n.trim()));
};

async function main2() {
  const data = await Utils.readText("./day-05/input.txt");
  const lines = data.split("\n\n");

  const seeds = parseSeeds2(lines.shift());
  const transforms = lines.map(parseTransform);

  const playSeed = (seed: number) => {
    let result = seed;
    for (let j = 0; j < transforms.length; j++) {
      const transform = transforms[j];
      for (let i = 0; i < transform.ranges.length; i++) {
        const range = transform.ranges[i];

        if (
          result >= range.source &&
          result <= range.source + range.length - 1
        ) {
          const offset = Math.abs(result - range.source);
          result = range.destination + offset;
          break;
        }
      }
      console.log("🚀 ~ file: index.ts:56 ~ playSeed ~ result:", result);
    }
    return result;
  };

  const result = seeds.map(playSeed);
  console.log("🚀 ~ file: index.ts:67 ~ main ~ result:", Math.min(...result));
}

main2();
