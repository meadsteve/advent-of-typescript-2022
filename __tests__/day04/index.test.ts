import {
  countFullyOverlappedPairs,
  parseLine,
  Range,
  solvePartOne,
} from '../../src/day04';
import { toAsyncGenerator } from '../../src/asyncHelpers';

describe('day 4', () => {
  it('can split a line into a pair of ranges', async function () {
    const pair = parseLine('2-4,6-8');
    expect(pair).toEqual([
      { lower: 2, upper: 4 },
      { lower: 6, upper: 8 },
    ]);
  });

  it('can calculate if a range entirely contains another', async function () {
    const biggerRange = new Range(1, 10);
    const smallerRange = new Range(2, 3);
    expect(biggerRange.contains(smallerRange)).toEqual(true);
    expect(smallerRange.contains(biggerRange)).toEqual(false);
  });

  it('can count the number of pairs with fully overlapped pairs', async function () {
    const input = toAsyncGenerator([
      '2-4,6-8',
      '2-3,4-5',
      '5-7,7-9',
      '2-8,3-7',
      '6-6,4-6',
      '2-6,4-8',
    ]);
    const result = await countFullyOverlappedPairs(input);
    expect(result).toEqual(2);
  });

  it('can solve part 1', async function () {
    const result = await solvePartOne();
    expect(result).toEqual('0');
  });
});
