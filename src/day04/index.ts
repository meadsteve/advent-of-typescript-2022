import { readLines } from '../fileHelpers';
import { aFilter, aMap, count, Tuple } from '../asyncHelpers';

export async function solvePartOne() {
  const lines = readLines('src/day04/input.txt');
  const fullOverlaps = await countFullyOverlappedPairs(lines);
  return fullOverlaps.toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day04/input.txt');
  const partialOverlaps = await countPartiallyOverlappedPairs(lines);
  return partialOverlaps.toString();
}

export class Range {
  constructor(private lower: number, private upper: number) {}

  contains(other: Range): boolean {
    return this.lower <= other.lower && this.upper >= other.upper;
  }

  overlaps(other: Range): boolean {
    return (
      (other.lower >= this.lower && other.lower <= this.upper) ||
      (other.upper >= this.lower && other.upper <= this.upper) ||
      this.contains(other) ||
      other.contains(this)
    );
  }
}

export function parseLine(line: string): Tuple<Range, 2> {
  const [a, b] = line.split(',');
  return [rangeFromString(a), rangeFromString(b)];
}

function rangeFromString(range: string): Range {
  const [lower, upper] = range.split('-');
  return new Range(parseInt(lower, 10), parseInt(upper, 10));
}

export async function countFullyOverlappedPairs(
  input: AsyncGenerator<string>,
): Promise<number> {
  const ranges = aMap(input, parseLine);
  const fullyOverlappedPairs = aFilter(
    ranges,
    ([a, b]) => a.contains(b) || b.contains(a),
  );
  return await count(fullyOverlappedPairs);
}

export async function countPartiallyOverlappedPairs(
  input: AsyncGenerator<string>,
): Promise<number> {
  const ranges = aMap(input, parseLine);
  const partialOverlaps = aFilter(ranges, ([a, b]) => a.overlaps(b));
  return await count(partialOverlaps);
}
