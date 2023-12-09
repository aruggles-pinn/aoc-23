// Path: day-05/index.ts

import * as R from "ramda";
import * as Utils from "../utils/index.ts";

type Range = {
  min: number;
  max: number;
  source: number;
  destination: number;
  length: number;
};

type Transform = {
  min: number;
  max: number;
  from: string;
  to: string;
  ranges: Range[];
};

const parseRange = (line: string): Range => {
  const [destination, source, length] = line
    .split(/ +/g)
    .map((n) => parseInt(n.trim()));

  return {
    min: source,
    max: source + length - 1,
    source,
    destination,
    length,
  };
};

const parseTransform = (line: string): Transform => {
  const [locationsStr, ...rangesStr] = line.split("\n");

  const [from, to] = locationsStr.replaceAll(" map:", "").split("-to-");

  const ranges = rangesStr.map(parseRange);

  return {
    from,
    to,
    ranges,
    min: Math.min(...ranges.map((range) => range.min)),
    max: Math.max(...ranges.map((range) => range.max)),
  };
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
  const lines = data.split("\r\n\r\n");

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
    }
    return result;
  };

  const result = seeds.map(playSeed);
  console.log("🚀 ~ file: index.ts:67 ~ main ~ result:", Math.min(...result));
}

// main();

const parseSeeds2 = (line?: string) => {
  if (!line) return [];

  const array = line
    .replaceAll("seeds: ", "")
    .split(/ +/g)
    .map((n) => parseInt(n.trim()));

  return R.splitEvery(2, array) as [number, number][];
};

async function main2() {
  const data = await Utils.readText("./day-05/input.txt");
  const lines = data.split("\r\n\r\n");

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
    }
    return result;
  };

  const playSeedRange = (seedRange: [number, number]) => {
    let [start, length] = seedRange;
    let result = start;

    console.log(
      "🚀 ~ file: index.ts:125 ~ playSeedRange ~ start, length:",
      start,
      length
    );
    // FK IT - I'LL WAIT FOR THE ANSWER
    for (let i = start; i < start + length; i++) {
      const seed = playSeed(i);
      result = Math.min(result, seed);
    }
    return result;
  };

  const result = seeds.map(playSeedRange);
  console.log("🚀 ~ file: index.ts:67 ~ main ~ result:", Math.min(...result));
}

main2();
