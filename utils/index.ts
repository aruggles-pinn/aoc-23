import { Matrix } from "./matrix";
import { readFile } from "node:fs/promises";

export function isNumber(value: string): boolean {
  return !isNaN(parseInt(value));
}

export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

export function uniq<T>(arr: T[][]): T[][] {
  return arr.filter((value, index, self) => {
    return (
      self.findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(value)
      ) === index
    );
  });
}

export async function readMatrix<T>(input: string): Promise<Matrix<T>> {
  const lines = await readLines(input);
  return new Matrix(
    lines.map((line) => line.split("").map((cell) => cell as T))
  );
}

export async function readText(input: string): Promise<string> {
  try {
    return readFile(input, { encoding: "utf8", flag: "r" });
  } catch (error) {
    console.error("Error reading file:", error);
    return "";
  }
}

export async function readJson<T>(input: string): Promise<T> {
  try {
    return JSON.parse(await readText(input));
  } catch (error) {
    console.error("Error reading file:", error);
    return {} as T;
  }
}

export async function readLines(input: string): Promise<string[]> {
  return (await readText(input)).split("\n");
}

export function sum(arr: number[], initial: number = 0): number {
  return arr.reduce((acc, curr) => acc + curr, initial);
}

export function product(arr: number[], initial: number = 1): number {
  return arr.reduce((acc, curr) => acc * curr, initial);
}
