// Path: day-03/index.ts

import * as Utils from "../utils/index.ts";

async function main() {
  const matrix = await Utils.readMatrix<string>("./day-03/input.txt");
  const symbols = matrix.filter(
    (cell) => cell !== "." && !Utils.isNumber(cell)
  );
  const adjacent = symbols.map((symbol) =>
    matrix.filterAdjacent(symbol, (cell) => Boolean(cell.match(/[0-9]/)))
  );

  const numbers = adjacent.map((adj) => {
    const near = adj.map((vec) => {
      const items: any[] = [];
      const row = matrix.getRow(vec[1]);
      // check left and right
      let index = vec[0];
      while (index >= 0) {
        if (isNaN(parseInt(row[index]))) break;
        items.unshift(row[index]);
        index--;
      }

      const start = index + 1;

      index = vec[0] + 1;
      while (index < row.length) {
        if (isNaN(parseInt(row[index]))) break;
        items.push(row[index]);
        index++;
      }

      const end = index - 1;
      return [`${start}:${end}`, parseInt(items.join(""))];
    });
    const unique = Utils.uniq(near);
    const values = unique.map(([_, value]) => parseInt(value.toString()));
    return Utils.sum(values);
  });
  console.log("Part 1: ", Utils.sum(numbers));
}

main();

async function main2() {
  const matrix = await Utils.readMatrix<string>("./day-03/input.txt");
  const symbols = matrix.filter((cell) => cell === "*");
  const adjacent = symbols.map((symbol) =>
    matrix.filterAdjacent(symbol, (cell) => Boolean(cell.match(/[0-9]/)))
  );

  const numbers = adjacent.map((adj) => {
    const near = adj.map((vec) => {
      const items: any[] = [];
      const row = matrix.getRow(vec[1]);
      // check left and right
      let index = vec[0];
      while (index >= 0) {
        if (isNaN(parseInt(row[index]))) break;
        items.unshift(row[index]);
        index--;
      }

      const start = index + 1;

      index = vec[0] + 1;
      while (index < row.length) {
        if (isNaN(parseInt(row[index]))) break;
        items.push(row[index]);
        index++;
      }

      const end = index - 1;
      return [`${start}:${end}`, parseInt(items.join(""))];
    });
    const unique = Utils.uniq(near);
    const values = unique.map(([_, value]) => parseInt(value.toString()));
    return values.length === 2 ? Utils.product(values) : 0;
  });
  console.log("Part 2: ", Utils.sum(numbers));
}

main2();
