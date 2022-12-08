import {
  Directory,
  File,
  findDirectorySizesLessThan100k,
  parseInput,
} from '../../src/day07';
import { fromAsyncGenerator, toAsyncGenerator } from '../../src/asyncHelpers';
import { solvePartOne } from '../../src/day07';

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

    it('is possible to recursively iterate over all sub dirs', async function () {
      const root = new Directory('/');

      root.createDirectory('a').openDirectory('a').createDirectory('a-2');
      root.createDirectory('b');

      expect(root.subDirectories.map((d) => d.name)).toEqual(['a', 'a-2', 'b']);
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
  describe('the solution', () => {
    it('should solve the example in part 1', async function () {
      const input = toAsyncGenerator([
        '$ cd /',
        '$ ls',
        'dir a',
        '14848514 b.txt',
        '8504156 c.dat',
        'dir d',
        '$ cd a',
        '$ ls',
        'dir e',
        '29116 f',
        '2557 g',
        '62596 h.lst',
        '$ cd e',
        '$ ls',
        '584 i',
        '$ cd ..',
        '$ cd ..',
        '$ cd d',
        '$ ls',
        '4060174 j',
        '8033020 d.log',
        '5626152 d.ext',
        '7214296 k',
      ]);
      expect(await findDirectorySizesLessThan100k(input)).toEqual([94853, 584]);
    });

    it('should solve part one', async function () {
      expect(await solvePartOne()).toEqual('0');
    });
  });
});
