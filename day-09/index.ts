import * as Utils from "../utils/index.ts";

// Path: day-09/index.ts
import { LinkedList } from "../utils/linkedList/index.ts";

class InverseTree {
  lists: LinkedList<number>[] = [];
  depth = 0;
  constructor(public head: LinkedList<number>) {
    this.lists.push(head);
  }

  isFinished() {
    return this.lists[this.depth].toArray().every((n) => n === 0);
  }

  step() {
    const row = new LinkedList<number>();
    const prev = this.lists[this.depth];
    let node = prev.head;
    while (node) {
      const next = node.next;
      if (next) {
        row.append(next.value - node.value);
      }
      node = next;
    }
    this.lists.push(row);
    this.depth++;
  }

  grow() {
    while (!this.isFinished()) {
      this.step();
    }
  }

  expandRight() {
    for (let i = this.depth; i >= 0; i--) {
      const list = this.lists[i];
      const tail = list.tail!;
      if (tail.value === 0) {
        list.append(0);
        continue;
      }
      const prevList = this.lists[i + 1];
      if (!prevList) continue;

      const prevTail = prevList.tail!;
      const newTail = prevTail.value + tail.value;
      list.append(newTail);
    }
  }

  expandLeft() {
    for (let i = this.depth; i >= 0; i--) {
      const list = this.lists[i];
      const head = list.head!;
      if (i === this.depth) {
        list.prepend(0);
        continue;
      }
      const prevList = this.lists[i + 1];
      if (!prevList) continue;

      const prevHead = prevList.head!;
      const newHead = head.value - prevHead.value;
      list.prepend(newHead);
    }
  }
}

async function main() {
  const matrix = await Utils.readMatrix<string>("./day-09/input.txt");
  const lists: LinkedList<number>[] = [];
  for (let i = 0; i < matrix.rows; i++) {
    const list = new LinkedList<number>();
    const row = matrix.getRow(i);
    for (let j = 0; j < row.length; j++) {
      list.append(parseInt(row[j]));
    }
    lists.push(list);
  }

  const trees = lists.map((list) => new InverseTree(list));
  trees.forEach((tree) => tree.grow());
  trees.forEach((tree) => tree.expandRight());
  trees.forEach((tree) => tree.expandLeft());
  const total1 = Utils.sum(trees.map((tree) => tree.head.head!.value));
  const total2 = Utils.sum(trees.map((tree) => tree.head.tail!.value));
  console.log("🚀 ~ file: index.ts:91 ~ main ~ total2:", total2);
  console.log("🚀 ~ file: index.ts:74 ~ main ~ total:", total1);
}

main();
