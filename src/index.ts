import { program, InvalidArgumentError } from 'commander';
import figlet from 'figlet';

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
  const moduleName = day < 10 ? `day0${day}` : `day${day}`;
  const modulePath = `./${moduleName}/index`;
  let module: Day | undefined = undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    module = require(modulePath) as Day;
  } catch (e) {
    console.log(`Couldn't load module: ${modulePath}`);
  }
  if (!module) {
    return Promise.resolve(`TODO: implement day ${day}`);
  }
  return runPart(module, part);
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
} else {
  console.log('You must provide a day AND a part');
}
export { Singleton } from './singleton';
