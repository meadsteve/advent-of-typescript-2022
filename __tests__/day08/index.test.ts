import { toAsyncGenerator } from '../../src/asyncHelpers';
import { inputToForest, solvePartOne } from '../../src/day08';

describe('day 8', () => {
  const exampleInput = ['30373', '25512', '65332', '33549', '35390'];

  it('parses input somewhat correctly', async function () {
    const forest = await inputToForest(toAsyncGenerator(exampleInput));
    expect(forest.rows.length).toEqual(5);
    expect(forest.columns.length).toEqual(5);
  });

  it('counts the visible trees', async function () {
    const forest = await inputToForest(toAsyncGenerator(exampleInput));
    expect(forest.countVisibleTrees()).toEqual(21);
  });

  it('solves part one', async function () {
    expect(await solvePartOne()).toEqual('1794');
  });
});
