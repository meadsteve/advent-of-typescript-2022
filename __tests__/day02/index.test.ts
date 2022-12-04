import {
  partOneParse,
  partTwoParse,
  play,
  score,
  solvePartOne,
  solvePartTwo,
} from '../../src/day02';

describe('day two', () => {
  // it('decodes lines properly - For part one', async function () {
  //   expect(partOneParse('A Y')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'paper',
  //   });
  //   expect(partOneParse('B Y')).toEqual({
  //     elfPick: 'paper',
  //     humanPick: 'paper',
  //   });
  //   expect(partOneParse('C Y')).toEqual({
  //     elfPick: 'scissors',
  //     humanPick: 'paper',
  //   });
  //   expect(partOneParse('A X')).toEqual({ elfPick: 'rock', humanPick: 'rock' });
  //   expect(partOneParse('A Y')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'paper',
  //   });
  //   expect(partOneParse('A Z')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'scissors',
  //   });
  // });
  //
  // it('decodes lines properly - For part two', async function () {
  //   expect(partTwoParse('A Y')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'rock',
  //   });
  //
  //   expect(partTwoParse('A X')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'scissors',
  //   });
  //
  //   expect(partTwoParse('A Z')).toEqual({
  //     elfPick: 'rock',
  //     humanPick: 'paper',
  //   });
  // });
  //
  // it('can play a game', async function () {
  //   expect(play({ elfPick: 'rock', humanPick: 'paper' })).toEqual({
  //     playedMove: 'paper',
  //     outcome: 'win',
  //   });
  //   expect(play({ elfPick: 'paper', humanPick: 'paper' })).toEqual({
  //     playedMove: 'paper',
  //     outcome: 'draw',
  //   });
  //   expect(play({ elfPick: 'scissors', humanPick: 'paper' })).toEqual({
  //     playedMove: 'paper',
  //     outcome: 'lose',
  //   });
  // });
  //
  // it('can score a game result', async function () {
  //   expect(score({ playedMove: 'paper', outcome: 'win' })).toEqual(8);
  // });

  it('can solve part one', async function () {
    const solution = await solvePartOne();
    expect(solution).toBe('15422');
  });

  it('can solve part two', async function () {
    const solution = await solvePartTwo();
    expect(solution).toBe('15442');
  });
});
