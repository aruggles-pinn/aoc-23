import { readLines, sum, values } from "../utils/index.ts";

import { parse } from "path";

// Path: day-04/index.ts

type Card = {
  id: number;
  wins: number[];
  total: number;
};

function parseCard(line: string): Card {
  const [idStr, cardStr] = line.split(": ");
  const id = parseInt(idStr.replace("Card ", ""));
  const [left, right] = cardStr
    .split(" | ")
    .map((line) => line.split(/ +/g).map((n) => parseInt(n.trim())));

  return {
    id,
    wins: left
      .filter((item) => right.indexOf(item) > -1)
      .map((_, index) => id + index + 1),
    total: 0,
  };
}

async function main() {
  const lines = await readLines("./day-04/input.txt");

  const cards = lines.map(parseCard);

  const result = cards.map((card) => {
    let total = card.wins.length;
    let points = 0;

    if (total > 0) {
      points++;
      total--;
    }

    for (let i = 0; i < total; i++) points *= 2;

    return points;
  });

  console.log("🚀 ~ file: index.ts:25 ~ result ~ result:", sum(result));
}

main();

async function main2() {
  const lines = await readLines("./day-04/input.txt");

  const cards: Map<number, Card> = new Map();

  lines.map(parseCard).forEach((card) => cards.set(card.id, card));

  function playCard(card?: Card) {
    if (!card) return;
    card.total++;
    card.wins.map((id) => cards.get(id)).forEach(playCard);
  }

  cards.forEach(playCard);

  const result = values(cards).map((card) => card.total);
  console.log("🚀 ~ file: index.ts:80 ~ result ~ result:", sum(result));
}

main2();
