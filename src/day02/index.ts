import { readLines } from '../fileHelpers';
import { aMap, sum } from '../asyncHelpers';
import { Singleton } from '../singleton';

export async function solvePartOne() {
  const lines = readLines('src/day02/input.txt');
  const moves = aMap(lines, partOneParse);
  const results = aMap(moves, play);
  const scores = aMap(results, score);
  const total = await sum(scores);
  return total.toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day02/input.txt');
  const moves = aMap(lines, partTwoParse);
  const results = aMap(moves, play);
  const scores = aMap(results, score);
  const total = await sum(scores);
  return total.toString();
}

export class Rock extends Singleton {
  name = 'rock';
  points = 1;
  beatenBy = Paper;
  beats = Scissors;
}

export class Paper extends Singleton {
  name = 'paper';
  points = 2;
  beatenBy = Scissors;
  beats = Rock;
}

export class Scissors extends Singleton {
  name = 'scissors';
  points = 3;
  beatenBy = Rock;
  beats = Paper;
}

type Move = Rock | Paper | Scissors;
type ResultType = 'win' | 'lose' | 'draw';

interface GoodStrategy {
  elfPick: Move;
  humanPick: Move;
}

interface GameResult {
  playedMove: Move;
  outcome: ResultType;
}

const moveMap: Record<string, Move> = {
  A: new Rock(),
  B: new Paper(),
  C: new Scissors(),
  X: new Rock(),
  Y: new Paper(),
  Z: new Scissors(),
};

export function partOneParse(line: string): GoodStrategy {
  const [elfPart, humanPart] = line.split(' ');
  return {
    elfPick: moveMap[elfPart],
    humanPick: moveMap[humanPart],
  };
}

function pickCorrectMoveForPartTwo(humanPart: string, elfPick: Move): Move {
  if (humanPart === 'X') {
    return new elfPick.beats();
  } else if (humanPart === 'Y') {
    return elfPick;
  } else {
    return new elfPick.beatenBy();
  }
}

export function partTwoParse(line: string): GoodStrategy {
  const [elfPart, humanPart] = line.split(' ');
  const elfPick = moveMap[elfPart];
  const humanPick = pickCorrectMoveForPartTwo(humanPart, elfPick);
  return {
    elfPick,
    humanPick,
  };
}

function result(humanPick: Move, elfPick: Move): ResultType {
  if (humanPick.constructor.name === elfPick.constructor.name) {
    return 'draw';
  } else if (humanPick instanceof elfPick.beats) {
    return 'lose';
  } else {
    return 'win';
  }
}

export function play({ elfPick, humanPick }: GoodStrategy): GameResult {
  return {
    playedMove: humanPick,
    outcome: result(humanPick, elfPick),
  };
}

const pointsMap: Record<ResultType, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

export function score({ playedMove, outcome }: GameResult): number {
  return playedMove.points + pointsMap[outcome];
}
