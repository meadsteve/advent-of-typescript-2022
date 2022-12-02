import { readLines } from '../fileHelpers';
import { aMap, sum } from '../asyncHelpers';

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

type Move = 'rock' | 'paper' | 'scissors';
type ResultType = 'win' | 'lose' | 'draw';

interface GoodStrategy {
  elfPick: Move;
  humanPick: Move;
}

interface GameResult {
  playedMove: Move;
  outcome: ResultType;
}

const beatMap: Record<Move, Record<Move, ResultType>> = {
  rock: {
    rock: 'draw',
    paper: 'lose',
    scissors: 'win',
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'lose',
  },
  scissors: {
    rock: 'lose',
    paper: 'win',
    scissors: 'draw',
  },
};

const moveMap: Record<string, Move> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

export function partOneParse(line: string): GoodStrategy {
  const [elfPart, humanPart] = line.split(' ');
  return {
    elfPick: moveMap[elfPart],
    humanPick: moveMap[humanPart],
  };
}

function pickCorrectMoveForPartTwo(humanPart: string, elfPick: Move) {
  let requiredResult: ResultType | null = null;
  if (humanPart === 'X') {
    requiredResult = 'win';
  } else if (humanPart === 'Y') {
    requiredResult = 'draw';
  } else {
    requiredResult = 'lose';
  }
  const humanPick = Object.entries(beatMap[elfPick]).find(
    ([_, result]) => result === requiredResult,
  );
  if (!humanPick) {
    throw new Error('Something went wrong');
  }
  return humanPick;
}

export function partTwoParse(line: string): GoodStrategy {
  const [elfPart, humanPart] = line.split(' ');
  const elfPick = moveMap[elfPart];
  const humanPick = pickCorrectMoveForPartTwo(humanPart, elfPick);
  return {
    elfPick,
    humanPick: humanPick[0] as Move,
  };
}

export function play({ elfPick, humanPick }: GoodStrategy): GameResult {
  return {
    playedMove: humanPick,
    outcome: beatMap[humanPick][elfPick],
  };
}

const pointsMap: Record<Move | ResultType, number> = {
  lose: 0,
  draw: 3,
  win: 6,
  rock: 1,
  paper: 2,
  scissors: 3,
};

export function score({ playedMove, outcome }: GameResult): number {
  return pointsMap[playedMove] + pointsMap[outcome];
}
