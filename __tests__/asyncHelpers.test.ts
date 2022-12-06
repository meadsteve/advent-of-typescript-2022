import {
  aFilter,
  count,
  enumerate,
  fromAsyncGenerator,
  groupsOfN,
  largest,
  largestN,
  slidingWindow,
  takeUntil,
  toAsyncGenerator,
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

  it('can enumerate a generator', async function () {
    const input = toAsyncGenerator(['zero', 'one', 'two']);
    const result = await fromAsyncGenerator(enumerate(input));
    expect(result).toEqual([
      [0, 'zero'],
      [1, 'one'],
      [2, 'two'],
    ]);
  });

  it('can group items into lists of N', async function () {
    const input = toAsyncGenerator([1, 2, 3, 4, 5, 6]);
    const result = await fromAsyncGenerator(groupsOfN(input, 2));
    expect(result).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('can count a generators items', async function () {
    const input = toAsyncGenerator(['one', 'two', 'three']);
    const result = await count(input);
    expect(result).toEqual(3);
  });

  it('can filter an async generator', async function () {
    const input = toAsyncGenerator([1, 2, 3, 4, 5, 6]);
    const result = await fromAsyncGenerator(aFilter(input, (n) => n % 2 === 0));
    expect(result).toEqual([2, 4, 6]);
  });

  it('can take all items until a function returns true', async function () {
    const input = toAsyncGenerator(['one', 'two', 'three', 'four', 'five']);
    const result = await takeUntil(input, (l) => l === 'three');
    expect(result).toEqual(['one', 'two']);
    expect(await input.next()).toEqual({ value: 'four', done: false });
  });

  describe('finding large numbers', () => {
    it('can find the largest in a stream', async function () {
      const input = toAsyncGenerator([1, 2, 5, 4, 3]);
      const result = await largest(input);
      expect(result).toEqual(5);
    });

    it('can find the largest in a stream - even for negatives', async function () {
      const input = toAsyncGenerator([-1, -2]);
      const result = await largest(input);
      expect(result).toEqual(-1);
    });

    it('can find the largest N items in a stream', async function () {
      const input = toAsyncGenerator([1, 5, 4, 1, 1, 1, 5, 7, 3, 7]);
      const result = (await largestN(input, 3)).sort();
      const expected = [7, 7, 5].sort();
      expect(result).toEqual(expected);
    });
  });
});
