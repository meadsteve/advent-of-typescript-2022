import {
  findStartOfMessageMarkerPosition,
  findStartOfPacketMarkerPosition,
  solvePartOne,
  solvePartTwo,
} from '../../src/day06';

describe('day 6', () => {
  it('can find the location of the start of packet marker position', async function () {
    expect(
      await findStartOfPacketMarkerPosition('bvwbjplbgvbhsrlpgdmjqwftvncz'),
    ).toEqual(5);
    expect(
      await findStartOfPacketMarkerPosition('nppdvjthqldpwncqszvftbrmjlhg'),
    ).toEqual(6);
  });

  it('can find the location of the start of message marker position', async function () {
    expect(
      await findStartOfMessageMarkerPosition('bvwbjplbgvbhsrlpgdmjqwftvncz'),
    ).toEqual(23);
    expect(
      await findStartOfMessageMarkerPosition('nppdvjthqldpwncqszvftbrmjlhg'),
    ).toEqual(23);
  });

  it('can solve part one', async function () {
    expect(await solvePartOne()).toEqual('1598');
  });

  it('can solve part two', async function () {
    expect(await solvePartTwo()).toEqual('2414');
  });
});
