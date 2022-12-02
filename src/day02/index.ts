import { readLines } from '../fileHelpers';
import { aMap, sum } from '../asyncHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day02/input.txt');
  const moves = aMap(lines, parse);
  const results = aMap(moves, play);
  const scores = aMap(results, score);
  const total = await sum(scores);
  return total.toString();
}

export async function solvePartTwo() {
  const input = readLines('src/day02/input.txt');
  return 'todo';
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

const moveMap: Record<string, Move> = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

export function parse(line: string): GoodStrategy {
  const [elfPart, humanPart] = line.split(' ');
  return {
    elfPick: moveMap[elfPart],
    humanPick: moveMap[humanPart],
  };
}

export function play({ elfPick, humanPick }: GoodStrategy): GameResult {
  if (elfPick === humanPick) {
    return {
      playedMove: humanPick,
      outcome: 'draw',
    };
  }
  switch (humanPick) {
    case 'rock':
      return {
        playedMove: humanPick,
        outcome: elfPick === 'scissors' ? 'win' : 'lose',
      };
    case 'paper':
      return {
        playedMove: humanPick,
        outcome: elfPick === 'rock' ? 'win' : 'lose',
      };
    case 'scissors':
      return {
        playedMove: humanPick,
        outcome: elfPick === 'paper' ? 'win' : 'lose',
      };
  }
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
