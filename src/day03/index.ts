import { readLines } from '../fileHelpers';
import { aMap, groupsOfN, sum } from '../asyncHelpers';

type ListOfItems = string;
type Item = string;

export async function solvePartOne() {
  const lines = readLines('src/day03/input.txt');
  return (await totalPriorityForPartOne(lines)).toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day03/input.txt');
  return (await totalPriorityForPartTwo(lines)).toString();
}

export function splitPack(input: ListOfItems): [ListOfItems, ListOfItems] {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

export function findCommonItem([first, ...rest]: ListOfItems[]): Item {
  for (let i = 0; i < first.length; i++) {
    if (isInAllLists(first[i], rest)) {
      return first[i];
    }
  }
  throw new Error('No common item found');
}

function isInAllLists(item: Item, lists: ListOfItems[]): boolean {
  return lists.every((list) => list.includes(item));
}

export function getPriority(input: Item): number {
  const charCode = input.charCodeAt(0);
  if (charCode > 97) {
    return charCode - 96;
  }
  return charCode - 38;
}

async function totalPriority(
  groups: AsyncGenerator<ListOfItems[]>,
): Promise<number> {
  const commonItems = aMap(groups, findCommonItem);
  const priorities = aMap(commonItems, getPriority);
  return sum(priorities);
}

export async function totalPriorityForPartOne(
  bags: AsyncGenerator<ListOfItems>,
): Promise<number> {
  const compartmentPairs = aMap(bags, splitPack);
  return totalPriority(compartmentPairs);
}

export async function totalPriorityForPartTwo(
  bags: AsyncGenerator<ListOfItems>,
): Promise<number> {
  const groups = groupsOfN(bags, 3);
  return totalPriority(groups);
}
