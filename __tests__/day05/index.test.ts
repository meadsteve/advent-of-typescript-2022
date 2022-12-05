import {
  parseMoveInstructionLine,
  parseTowerDescription,
  parseTowerDescriptionLine,
  solvePartOne,
  solvePartTwo,
  Stack,
  StackSet,
} from '../../src/day05';

describe('day 5', () => {
  it('can move items onto a stack', async function () {
    const tower = new Stack();

    tower.push('A');
    tower.push('B');

    const expected = '[B]\n[A]';
    expect(tower.prettyView).toEqual(expected);
  });

  it('can move items off the top of a stack', async function () {
    const tower = new Stack();

    tower.push('A');
    tower.push('B');
    tower.push('C');

    const removed = tower.pop(2);
    expect(removed).toEqual(['C', 'B']);
    expect(tower.prettyView).toEqual('[A]');
  });

  it('build a set of stacks', async function () {
    const towers = new StackSet();
    towers.createStack(['N', 'Z']);
    towers.createStack(['D', 'C', 'M']);
    towers.createStack(['P']);

    expect(towers.get(1).prettyView).toEqual('[N]\n[Z]');
    expect(towers.get(2).prettyView).toEqual('[D]\n[C]\n[M]');
    expect(towers.get(3).prettyView).toEqual('[P]');
  });

  it('can apply moves to a set of stacks - CrateMover9000', async function () {
    const towers = new StackSet();
    towers.createStack(['N', 'Z']);
    towers.createStack(['D', 'C', 'M']);
    towers.createStack(['P']);

    towers.makeMoveWithCrateMover9000({ amount: 1, from: 2, to: 1 });

    expect(towers.get(1).prettyView).toEqual('[D]\n[N]\n[Z]');
    expect(towers.get(2).prettyView).toEqual('[C]\n[M]');
  });

  it('can apply moves to a set of stacks - CrateMover9001', async function () {
    const towers = new StackSet();
    towers.createStack(['D', 'N', 'Z']);
    towers.createStack(['C', 'M']);
    towers.createStack(['P']);

    towers.makeMoveWithCrateMover9001({ amount: 3, from: 1, to: 3 });

    expect(towers.get(3).prettyView).toEqual('[D]\n[N]\n[Z]\n[P]');
  });

  it('can parse move instruction lines', async function () {
    const line = 'move 1 from 2 to 1';
    expect(parseMoveInstructionLine(line)).toEqual({
      amount: 1,
      from: 2,
      to: 1,
    });
  });

  it('can parse a tower description lines', async function () {
    expect(parseTowerDescriptionLine('    [D]    ')).toEqual([null, 'D', null]);
    expect(parseTowerDescriptionLine('[Z] [M] [P]')).toEqual(['Z', 'M', 'P']);
  });

  it('can parse the tower description', async function () {
    const lines = ['    [D]    ', '[N] [C]    ', '[Z] [M] [P]', ' 1   2   3 '];

    const expectedTowers = new StackSet();
    expectedTowers.createStack(['N', 'Z']);
    expectedTowers.createStack(['D', 'C', 'M']);
    expectedTowers.createStack(['P']);

    expect(parseTowerDescription(lines)).toEqual(expectedTowers);
  });

  it('can solve part 1', async function () {
    const result = await solvePartOne();
    expect(result).toEqual('SHMSDGZVC');
  });

  it('can solve part 2', async function () {
    const result = await solvePartTwo();
    expect(result).toEqual('VRZGHDFBQ');
  });
});
