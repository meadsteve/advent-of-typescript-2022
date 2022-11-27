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

program.option<number>('-d, --day <number>', 'The day to run', parseDay);

program.parse();

const options = program.opts();

console.log(figlet.textSync('Advent of Code 2022'));
console.log(`I would solve day ${options.day}`);
