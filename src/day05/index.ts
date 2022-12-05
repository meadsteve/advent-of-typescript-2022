import { readLines } from '../fileHelpers';
import { aMap, takeUntil } from '../asyncHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day05/input.txt');
  const header = await takeUntil(lines, (line) => line === '');
  const towers = parseTowerDescription(header);
  const moves = aMap(lines, parseMoveInstructionLine);
  for await (const move of moves) {
    towers.makeMove(move);
  }
  return towers.tops;
}

export async function solvePartTwo() {
  const lines = readLines('src/day05/input.txt');
  return 'todo';
}

export class Stack {
  private items: string[] = [];

  push(a: string) {
    this.items.push(a);
  }

  get top(): string {
    return this.items[this.items.length - 1];
  }
  get prettyView(): string {
    return this.items
      .map((i) => `[${i}]`)
      .reverse()
      .join('\n');
  }

  pop(number: number): string[] {
    const popped = [];
    for (let i = 0; i < number; i++) {
      const item = this.items.pop();
      if (!item) {
        throw new Error("Can't pop an empty stack");
      }
      popped.push(item);
    }
    return popped;
  }
}

type Move = { amount: number; from: number; to: number };

export class StackSet {
  private stacks: Stack[] = [];

  createStack(items: string[]) {
    const newStack = new Stack();
    items.reverse().forEach((i) => newStack.push(i));
    this.stacks.push(newStack);
  }

  get tops(): string {
    return this.stacks.map((s) => s.top).join('');
  }
  get(pos: number): Stack {
    return this.stacks[pos - 1];
  }

  getOrCreate(pos: number): Stack {
    if (!this.stacks[pos - 1]) {
      this.stacks[pos - 1] = new Stack();
    }
    return this.stacks[pos - 1];
  }

  makeMove({ amount, from, to }: Move) {
    const items = this.get(from).pop(amount);
    for (const item of items) {
      this.get(to).push(item);
    }
  }
}

export function parseMoveInstructionLine(line: string): Move {
  const regex = /(\d+) from (\d+) to (\d+)/;
  const data = regex.exec(line);
  if (!data) {
    throw new Error(`Can't parse line: ${line}`);
  }
  return {
    amount: parseInt(data[1]),
    from: parseInt(data[2]),
    to: parseInt(data[3]),
  };
}

export function parseTowerDescription(lines: string[]): StackSet {
  lines.reverse();
  const [_header, ...rest] = lines;
  const stacks = new StackSet();
  for (const line of rest) {
    const items = parseTowerDescriptionLine(line);
    for (let tower = 1; tower <= items.length; tower++) {
      const item = items[tower - 1];
      if (item) {
        stacks.getOrCreate(tower).push(item);
      }
    }
  }
  return stacks;
}

export function parseTowerDescriptionLine(line: string): (string | null)[] {
  const parts = line.match(/.{3,4}/g);
  if (!parts) {
    throw new Error(`Can't parse line: ${line}`);
  }
  return parts.map((part) => {
    if (part[0] === '[') {
      return part[1];
    } else {
      return null;
    }
  });
}
