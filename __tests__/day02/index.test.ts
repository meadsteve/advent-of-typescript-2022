import {
  Paper,
  partOneParse,
  partTwoParse,
  play,
  Rock,
  Scissors,
  score,
  solvePartOne,
  solvePartTwo,
} from '../../src/day02';

describe('day two', () => {
  it('decodes lines properly - For part one', async function () {
    expect(partOneParse('A Y')).toEqual(
      expect.objectContaining({
        elfPick: expect.any(Rock),
        humanPick: expect.any(Paper),
      }),
    );
    expect(partOneParse('C Y')).toEqual(
      expect.objectContaining({
        elfPick: expect.any(Scissors),
        humanPick: expect.any(Paper),
      }),
    );
  });

  it('decodes lines properly - For part two', async function () {
    expect(partTwoParse('A Y')).toEqual(
      expect.objectContaining({
        elfPick: expect.any(Rock),
        humanPick: expect.any(Rock),
      }),
    );
  });

  it('can play a game', async function () {
    expect(play({ elfPick: new Rock(), humanPick: new Paper() })).toEqual(
      expect.objectContaining({
        playedMove: expect.any(Paper),
        outcome: 'win',
      }),
    );
  });

  it('can score a game result', async function () {
    expect(score({ playedMove: new Paper(), outcome: 'win' })).toEqual(8);
  });

  it('amuses me if the moves are singletons', async function () {
    expect(new Rock()).toBe(new Rock());
    expect(new Paper()).toBe(new Paper());
    expect(new Scissors()).toBe(new Scissors());
    expect(new Rock()).not.toBe(new Paper());
    expect(new Rock()).not.toBe(new Scissors());
  });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('15422');
  });

  it('can solve part two', async function () {
    const solution = await solvePartTwo();
    expect(solution).toBe('15442');
  });
});
