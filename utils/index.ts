import { readFile } from "node:fs/promises";

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
