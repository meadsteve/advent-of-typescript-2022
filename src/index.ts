import { program } from 'commander';
import figlet from 'figlet';

program.description('Ho ho ho');
program.version('1');

program.requiredOption('-d, --day <number>', 'The day to run', /[0-9][0-9]?/);

program.parse();

const options = program.opts();

console.log(figlet.textSync('Advent of Code 2022'));
console.log(`I would solve day ${options.day}`);
