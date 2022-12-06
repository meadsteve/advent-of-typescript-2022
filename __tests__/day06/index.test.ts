import { findMarkerPosition, solvePartOne } from '../../src/day06';

describe('day 6', () => {
  it('can find the location of the marker position', async function () {
    expect(await findMarkerPosition('bvwbjplbgvbhsrlpgdmjqwftvncz')).toEqual(5);
    expect(await findMarkerPosition('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(6);
  });

  it('can solve part one', async function () {
    expect(await solvePartOne()).toEqual('1598');
  });
});
