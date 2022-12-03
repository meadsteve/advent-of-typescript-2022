import { toAsyncGenerator } from '../../src/asyncHelpers';
import {
  findCommonItem,
  getPriority,
  solvePartOne,
  solvePartTwo,
  splitPack,
  totalPriorityForPartOne,
  totalPriorityForPartTwo,
} from '../../src/day03';

describe('day 03', () => {
  it('split a rucksack string into its two compartments', async function () {
    expect(splitPack('vJrwpWtwJgWrhcsFMMfFFhFp')).toEqual([
      'vJrwpWtwJgWr',
      'hcsFMMfFFhFp',
    ]);
  });

  it('can find the common item between two packs', async function () {
    expect(findCommonItem(['vJrwpWtwJgWr', 'hcsFMMfFFhFp'])).toEqual('p');
  });

  it('can find the priority of letters', async function () {
    expect(getPriority('p')).toEqual(16);
    expect(getPriority('A')).toEqual(27);
    expect(getPriority('L')).toEqual(38);
    expect(getPriority('t')).toEqual(20);
  });

  it('get the total priority for a set of bags - according to part one', async function () {
    const bags = toAsyncGenerator([
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw',
    ]);
    expect(await totalPriorityForPartOne(bags)).toEqual(157);
  });

  it('get the total priority for a set of bags - according to part two', async function () {
    const bags = toAsyncGenerator([
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw',
    ]);
    expect(await totalPriorityForPartTwo(bags)).toEqual(70);
  });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('8105');
  });

  it('can solve part two', async function () {
    const solution = await solvePartTwo();
    expect(solution).toBe('2363');
  });
});
