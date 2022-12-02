import { parse, play, score, solvePartOne } from '../../src/day02';

describe('day two', () => {
  it('decodes lines properly', async function () {
    expect(parse('A Y')).toEqual({ elfPick: 'rock', humanPick: 'paper' });
    expect(parse('B Y')).toEqual({ elfPick: 'paper', humanPick: 'paper' });
    expect(parse('C Y')).toEqual({ elfPick: 'scissors', humanPick: 'paper' });
    expect(parse('A X')).toEqual({ elfPick: 'rock', humanPick: 'rock' });
    expect(parse('A Y')).toEqual({ elfPick: 'rock', humanPick: 'paper' });
    expect(parse('A Z')).toEqual({ elfPick: 'rock', humanPick: 'scissors' });
  });

  it('can play a game', async function () {
    expect(play({ elfPick: 'rock', humanPick: 'paper' })).toEqual({
      playedMove: 'paper',
      outcome: 'win',
    });
    expect(play({ elfPick: 'paper', humanPick: 'paper' })).toEqual({
      playedMove: 'paper',
      outcome: 'draw',
    });
    expect(play({ elfPick: 'scissors', humanPick: 'paper' })).toEqual({
      playedMove: 'paper',
      outcome: 'lose',
    });
  });

  it('can score a game result', async function () {
    expect(score({ playedMove: 'paper', outcome: 'win' })).toEqual(8);
  });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('15422');
  });
});
