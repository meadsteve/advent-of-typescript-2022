import { fromAsyncGenerator, toAsyncGenerator } from '../../src/asyncHelpers';
import { elfCalories, solvePartOne } from '../../src/day01';

describe('day one', () => {
  it('can add up elves calories from a list', async function () {
    const calorieList = toAsyncGenerator([
      '1000',
      '2000',
      '3000',
      '',
      '4000',
      '',
      '5000',
      '6000',
      '',
      '7000',
      '8000',
      '9000',
      '',
      '10000',
    ]);
    const result = await fromAsyncGenerator(elfCalories(calorieList));
    expect(result).toEqual([6000, 4000, 11000, 24000, 10000]);
  });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('70296');
  });
});
