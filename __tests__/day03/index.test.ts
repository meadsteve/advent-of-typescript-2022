import { toAsyncGenerator } from '../../src/asyncHelpers';
import {
  findCommonItem,
  getPriority,
  solvePartOne,
  splitPack,
  totalPriority,
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

  it('get the total priority for a set of bags', async function () {
    const bags = toAsyncGenerator([
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw',
    ]);
    expect(await totalPriority(bags)).toEqual(157);
  });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('8105');
  });
});
