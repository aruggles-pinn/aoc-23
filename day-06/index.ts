// Path: day-06/index.ts
import * as R from "ramda";
import * as Utils from "../utils/index.ts";

async function main() {
  const lines = await Utils.readLines("./day-06/input.txt");
  const [times, distances] = lines.map(
    (line) => line.match(/(\d+)/g)?.map((n) => parseInt(n)) ?? []
  );
  const rounds = R.zip(times, distances);

  let total = 1;

  rounds.forEach(([time, distance]) => {
    let count = 0;
    for (let i = 0; i < time; i++) {
      let travelTime = time - i;
      let totalDistance = travelTime * i;
      if (totalDistance > distance) {
        count += 1;
      }
    }
    total *= count;
  });

  console.log("🚀 ~ file: index.ts:13 ~ main ~ total:", total);
}

main();

async function main2() {
  const lines = await Utils.readLines("./day-06/input.txt");
  const [times, distances] = lines.map(
    (line) =>
      line
        .replaceAll(/ */g, "")
        .match(/(\d+)/g)
        ?.map((n) => parseInt(n)) ?? []
  );
  const rounds = R.zip(times, distances);

  let total = 1;

  rounds.forEach(([time, distance]) => {
    let count = 0;
    for (let i = 0; i < time; i++) {
      let travelTime = time - i;
      let totalDistance = travelTime * i;
      if (totalDistance > distance) {
        count += 1;
      }
    }
    total *= count;
  });

  console.log("🚀 ~ file: index.ts:13 ~ main ~ total:", total);
}

main2();
