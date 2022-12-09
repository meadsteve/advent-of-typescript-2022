import { readLines } from '../fileHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day08/input.txt');
  const forest = await inputToForest(lines);
  return forest.countVisibleTrees().toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day08/input.txt');
  return 'todo';
}

class Tree {
  readonly height: number;
  private _hasBeenSeen = false as boolean;

  constructor(height: number) {
    this.height = height;
  }

  markAsSeen() {
    this._hasBeenSeen = true;
  }

  get hasBeenSeen(): boolean {
    return this._hasBeenSeen;
  }
}

class Forest {
  private readonly _rows: Tree[][];
  private readonly _columns: Tree[][];

  constructor(forest: Tree[][]) {
    this._rows = forest;
    this._columns = [];
    for (let i = 0; i < this._rows.length; i++) {
      for (let j = 0; j < this._rows[i].length; j++) {
        if (!this._columns[i]) {
          this._columns[i] = [];
        }
        this._columns[i][j] = this._rows[j][i];
      }
    }
  }

  get rows(): Tree[][] {
    return this._rows;
  }

  get columns(): Tree[][] {
    return this._columns;
  }

  countVisibleTrees(): number {
    this.rows.forEach((trees) => this.markVisibleTrees(trees));
    this.columns.forEach((trees) => this.markVisibleTrees(trees));
    this.rows.forEach((trees) => this.markVisibleTrees(trees.reverse()));
    this.columns.forEach((trees) => this.markVisibleTrees(trees.reverse()));

    return this.rows
      .map((row) => row.filter((tree) => tree.hasBeenSeen).length)
      .reduce((a, b) => a + b);
  }

  private markVisibleTrees(line: Tree[]): void {
    let greatestHeight = -1;
    for (const tree of line) {
      if (tree.height > greatestHeight) {
        greatestHeight = tree.height;
        tree.markAsSeen();
      }
    }
  }
}

export async function inputToForest(
  input: AsyncGenerator<string>,
): Promise<Forest> {
  const allTrees: Tree[][] = [];
  for await (const line of input) {
    const row = line.split('').map((height) => new Tree(parseInt(height)));
    allTrees.push(row);
  }
  return new Forest(allTrees);
}
