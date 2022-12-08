import { Directory, File } from '../../src/day07';
import { fromAsyncGenerator, toAsyncGenerator } from '../../src/asyncHelpers';

type Command = { command: 'ls' } | { command: 'cd'; args: string };
type CommandAndResult = [Command, string[]];

async function* parseInput(
  input: AsyncGenerator<string>,
): AsyncGenerator<CommandAndResult> {
  let command: Command = parseCommand((await input.next()).value);
  let result: string[] = [];
  for await (const line of input) {
    if (line[0] === '$') {
      yield [command, result];
      result = [];
      command = parseCommand(line);
    } else {
      result.push(line);
    }
  }
  yield [command, result];
}

function parseCommand(command: string): Command {
  const [_dollar, commandName, ...args] = command.split(' ');
  if (commandName === 'ls') {
    return { command: 'ls' };
  } else if (commandName === 'cd') {
    return { command: 'cd', args: args.join(' ') };
  } else {
    throw new Error(`Unknown command ${commandName}`);
  }
}

describe('day 7', () => {
  describe('The file system', () => {
    it('has directories with names', async function () {
      const root = new Directory('/');
      expect(root.name).toEqual('/');
    });

    it('is possible to create sub directories', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      root.createDirectory('b');
      expect(root.subDirectoryNames).toEqual(['a', 'b']);
    });

    it('is possible to select the sub directories', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      root.createDirectory('b');

      const a = root.openDirectory('a');
      expect(a.name).toEqual('a');
    });

    it('is possible to select the parent directory using ..', async function () {
      const root = new Directory('/');
      root.createDirectory('a');
      const a = root.openDirectory('a');
      const hopefullyRoot = a.openDirectory('..');
      expect(hopefullyRoot.name).toEqual('/');
    });

    it('is possible to add a file to a directory', async function () {
      const root = new Directory('/');
      root.addFile(new File('file.txt', 90000));
      expect(root.fileNames).toEqual(['file.txt']);
    });

    it('is possible to get the size of a directory', async function () {
      const root = new Directory('/');
      root
        .addFile(new File('file_1.txt', 10))
        .createDirectory('a')
        .openDirectory('a')
        .addFile(new File('file_2.txt', 20))
        .addFile(new File('file_3.txt', 20))
        .openDirectory('..')
        .createDirectory('b')
        .addFile(new File('file_4.txt', 50));
      expect(root.size).toEqual(100);
    });
  });
  describe('the command input parser', () => {
    it('should break the input into command and result pairs', async function () {
      const input = toAsyncGenerator([
        '$ cd /',
        '$ ls',
        'dir a',
        '14848514 b.txt',
        '8504156 c.dat',
        'dir d',
        '$ cd a',
      ]);
      const commandAndResultPairs = await fromAsyncGenerator(parseInput(input));
      expect(commandAndResultPairs).toEqual([
        [{ command: 'cd', args: '/' }, []],
        [
          { command: 'ls' },
          ['dir a', '14848514 b.txt', '8504156 c.dat', 'dir d'],
        ],
        [{ command: 'cd', args: 'a' }, []],
      ]);
    });
  });
});
