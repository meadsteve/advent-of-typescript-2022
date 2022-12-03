import { readLines } from '../fileHelpers';
import { aMap, sum } from '../asyncHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day03/input.txt');
  return (await totalPriority(lines)).toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day03/input.txt');
  return 'TODO';
}

export function splitPack(input: string): [string, string] {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

export function findCommonItem([left, right]: [string, string]): string {
  for (let i = 0; i < left.length; i++) {
    if (right.includes(left[i])) {
      return left[i];
    }
  }
  throw new Error('No common item found');
}

export function getPriority(input: string): number {
  const charCode = input.charCodeAt(0);
  if (charCode > 97) {
    return charCode - 96;
  }
  return charCode - 38;
}

export async function totalPriority(
  bags: AsyncGenerator<string>,
): Promise<number> {
  const compartmentPairs = aMap(bags, splitPack);
  const commonItems = aMap(compartmentPairs, findCommonItem);
  const priorities = aMap(commonItems, getPriority);
  return sum(priorities);
}
