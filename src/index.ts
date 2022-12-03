import { program, InvalidArgumentError } from 'commander';
import figlet from 'figlet';
import * as day01 from './day01/index';
import * as day02 from './day02/index';
import * as day03 from './day03/index';

program.description('Ho ho ho');
program.version('1');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseDay(value: string, _: number): number {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 25) {
    throw new InvalidArgumentError("That's not an advent day");
  }
  return parsedValue;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parsePart(value: string, _: number): number {
  const parsedValue = parseInt(value, 10);
  if (parsedValue != 1 && parsedValue != 2) {
    throw new InvalidArgumentError('part must be 1 or 2');
  }
  return parsedValue;
}

interface Day {
  solvePartOne: () => Promise<string>;
  solvePartTwo: () => Promise<string>;
}

async function runCorrectDayAndPart(
  day: number,
  part: number,
): Promise<string> {
  switch (day) {
    case 1:
      return runPart(day01, part);
    case 2:
      return runPart(day02, part);
    case 3:
      return runPart(day03, part);
  }
  return Promise.resolve(`TODO: implement day ${day}`);
}

function runPart(
  { solvePartOne, solvePartTwo }: Day,
  part: number,
): Promise<string> {
  if (part === 1) {
    return solvePartOne();
  } else if (part === 2) {
    return solvePartTwo();
  }
  throw new Error('Bad part');
}
program.option<number>('-d, --day <number>', 'The day to run', parseDay);
program.option<number>('-p, --part <number>', 'The part to run', parsePart);

program.parse();

const options = program.opts();

console.log(figlet.textSync('Advent of Code 2022'));

if (options.day && options.part) {
  console.log(`Solving day ${options.day} part ${options.part}`);
  runCorrectDayAndPart(options.day, options.part).then((result) => {
    console.log(result);
  });
}
