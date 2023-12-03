export type Vector = [number, number];

export class Matrix<T> {
  constructor(public matrix: T[][]) {}

  get rows() {
    return this.matrix.length;
  }

  get columns() {
    return this.matrix[0].length;
  }

  get(vec: Vector) {
    return this.matrix[vec[1]][vec[0]];
  }

  set(point: Vector, value: T) {
    this.matrix[point[1]][point[0]] = value;
  }

  getRow(index: number) {
    return this.matrix[index];
  }

  getColumn(index: number) {
    return this.matrix.map((row) => row[index]);
  }

  setRow(index: number, values: T[]) {
    this.matrix[index] = values;
  }

  setColumn(index: number, values: T[]) {
    this.matrix.forEach((row, i) => (row[index] = values[i]));
  }

  find(callback: (value: T, vec: Vector) => boolean): Vector | undefined {
    for (let i = 0; i < this.matrix.length; i++) {
      const row = this.matrix[i];
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        if (callback(value, [j, i])) {
          return [j, i];
        }
      }
    }
  }

  filter(callback: (value: T, vec: Vector) => boolean): Vector[] {
    const result: Vector[] = [];
    this.forEach((value, i, j) => {
      if (callback(value, [j, i])) {
        result.push([j, i]);
      }
    });
    return result;
  }

  forEach(callback: (value: T, row: number, column: number) => void) {
    this.matrix.forEach((row, i) =>
      row.forEach((value, j) => callback(value, i, j))
    );
  }

  filterAdjacent(
    vec: Vector,
    callback: (value: T, vec: Vector) => boolean
  ): Vector[] {
    const result: Vector[] = [];
    const [x, y] = vec;
    const adjacent: Vector[] = [
      [x - 1, y], // left
      [x + 1, y], // right
      [x, y - 1], // top
      [x, y + 1], // bottom
      [x - 1, y - 1], // top left
      [x + 1, y + 1], // bottom right
      [x - 1, y + 1], // bottom left
      [x + 1, y - 1], // top right
    ];
    adjacent.forEach((vec) => {
      const value = this.get(vec);
      if (callback(value, vec)) {
        result.push(vec);
      }
    });
    return result;
  }

  map<U>(callback: (value: T, row: number, column: number) => U) {
    return this.matrix.map((row, i) =>
      row.map((value, j) => callback(value, i, j))
    );
  }

  clone() {
    return new Matrix(this.matrix.map((row) => [...row]));
  }

  static from<T>(matrix: T[][]) {
    return new Matrix(matrix);
  }
}
