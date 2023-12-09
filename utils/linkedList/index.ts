export class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}
}

export class LinkedList<T> {
  constructor(public head: LinkedListNode<T> | null = null) {}

  get length() {
    let length = 0;
    let node = this.head;
    while (node) {
      length++;
      node = node.next;
    }
    return length;
  }

  get tail() {
    let node = this.head;
    while (node && node.next) {
      node = node.next;
    }
    return node;
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    this.tail!.next = newNode;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
  }

  insertAfter(value: T, afterValue: T) {
    const existingNode = this.find(afterValue);
    if (!existingNode) {
      return;
    }
    const newNode = new LinkedListNode(value, existingNode.next);
    existingNode.next = newNode;
  }

  find(value: T) {
    let node = this.head;
    while (node) {
      if (node.value === value) {
        return node;
      }
      node = node.next;
    }
  }

  delete(value: T) {
    if (!this.head) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let node = this.head;
    while (node.next) {
      if (node.next.value === value) {
        node.next = node.next.next;
        return;
      }
      node = node.next;
    }
  }

  toArray() {
    const result: T[] = [];
    let node = this.head;
    while (node) {
      result.push(node.value);
      node = node.next;
    }
    return result;
  }
}
