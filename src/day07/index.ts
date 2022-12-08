import { readLines } from '../fileHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day07/input.txt');
  const sizes = await findDirectorySizesLessThan100k(lines);
  return sizes.reduce((t, n) => t + n).toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day07/input.txt');
  return (await findDirToDelete(lines)).size.toString();
}

export async function findDirToDelete(
  lines: AsyncGenerator<string>,
): Promise<Directory> {
  const disk = await buildDisk(lines);
  const freeSpace = 70000000 - disk.size;
  const needToFree = 30000000 - freeSpace;
  const dirsBigEnough = disk.subDirectories
    .filter((d) => d.size >= needToFree)
    .sort((a, b) => a.size - b.size);
  return dirsBigEnough[0];
}

export class Directory {
  readonly name: string;
  private readonly parent?: Directory;
  private directSubDirectories = new Map<string, Directory>();
  private files = [] as File[];

  constructor(name: string, parent?: Directory) {
    this.name = name;
    this.parent = parent;
  }

  createDirectory(name: string): Directory {
    this.directSubDirectories.set(name, new Directory(name, this));
    return this;
  }

  get subDirectoryNames(): string[] {
    return Array.from(this.directSubDirectories.values()).map(
      (child) => child.name,
    );
  }

  get subDirectories(): Directory[] {
    return Array.from(this.directSubDirectories.values()).flatMap(
      (directory) => [directory, ...directory.subDirectories],
    );
  }

  get fileNames(): string[] {
    return this.files.map((file) => file.name);
  }

  get size(): number {
    const fileSize = this.files.reduce((total, file) => total + file.size, 0);
    const directorySize = Array.from(this.directSubDirectories.values()).reduce(
      (total, directory) => total + directory.size,
      0,
    );
    return fileSize + directorySize;
  }

  openDirectory(name: string): Directory {
    const child =
      name === '..' ? this.parent : this.directSubDirectories.get(name);
    if (!(child instanceof Directory)) {
      throw new Error(`No such directory: ${name}`);
    }
    return child;
  }

  addFile(file: File) {
    this.files.push(file);
    return this;
  }
}

export class File {
  readonly name: string;
  readonly size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

async function populateDiskBasedOnCommands(
  disk: Directory,
  commandsAndResults: AsyncGenerator<CommandAndResult>,
) {
  let currentDirectory = disk;
  for await (const [command, result] of commandsAndResults) {
    if (command.command === 'cd') {
      currentDirectory = currentDirectory.openDirectory(command.args);
    } else if (command.command === 'ls') {
      for (const line of result) {
        const [a, b] = line.split(' ');
        if (a === 'dir') {
          currentDirectory.createDirectory(b);
        } else {
          currentDirectory.addFile(new File(b, parseInt(a)));
        }
      }
    }
  }
}

async function buildDisk(input: AsyncGenerator<string>) {
  const commandsAndResults = parseInput(input);
  const disk = new Directory('');
  disk.createDirectory('/');
  await populateDiskBasedOnCommands(disk, commandsAndResults);
  return disk.openDirectory('/');
}

export async function findDirectorySizesLessThan100k(
  input: AsyncGenerator<string>,
): Promise<number[]> {
  const disk = await buildDisk(input);
  return disk.subDirectories.filter((d) => d.size < 100000).map((d) => d.size);
}

type Command = { command: 'ls' } | { command: 'cd'; args: string };
type CommandAndResult = [Command, string[]];

export async function* parseInput(
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
