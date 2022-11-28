import {
  toAsyncGenerator,
  fromAsyncGenerator,
  slidingWindow,
} from '../src/asyncHelpers';

describe('async helpers', () => {
  it('can generate sliding windows from a list', async function () {
    const input = toAsyncGenerator([1, 2, 3, 4, 5]);
    const result = await fromAsyncGenerator(slidingWindow(input, 3));
    expect(result).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });
});
