import { readLines } from '../fileHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day07/input.txt');
  return 'todo';
}

export async function solvePartTwo() {
  const lines = readLines('src/day037/input.txt');
  return 'todo';
}

export class Directory {
  readonly name: string;
  private readonly parent?: Directory;
  private subDirectories = new Map<string, Directory>();
  private files = [] as File[];

  constructor(name: string, parent?: Directory) {
    this.name = name;
    this.parent = parent;
  }

  createDirectory(name: string): Directory {
    this.subDirectories.set(name, new Directory(name, this));
    return this;
  }

  get subDirectoryNames(): string[] {
    return Array.from(this.subDirectories.values()).map((child) => child.name);
  }

  get fileNames(): string[] {
    return this.files.map((file) => file.name);
  }

  get size(): number {
    const fileSize = this.files.reduce((total, file) => total + file.size, 0);
    const directorySize = Array.from(this.subDirectories.values()).reduce(
      (total, directory) => total + directory.size,
      0,
    );
    return fileSize + directorySize;
  }

  openDirectory(name: string): Directory {
    const child = name === '..' ? this.parent : this.subDirectories.get(name);
    if (!(child instanceof Directory)) {
      throw new Error('No such directory');
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
