import { readSingleLine } from '../fileHelpers';

export async function solvePartOne() {
  const line = await readSingleLine('src/day06/input.txt');
  const markerPosition = findStartOfPacketMarkerPosition(line);
  return markerPosition.toString();
}

export async function solvePartTwo() {
  const line = await readSingleLine('src/day06/input.txt');
  const markerPosition = findStartOfMessageMarkerPosition(line);
  return markerPosition.toString();
}

export function findStartOfPacketMarkerPosition(input: string) {
  return findMarkerOfLength(input, 4);
}

export function findStartOfMessageMarkerPosition(input: string) {
  return findMarkerOfLength(input, 14);
}

function findMarkerOfLength(input: string, size: number) {
  for (let i = 0; i < input.length - size; i++) {
    const uniqueLetters = new Set(input.slice(i, i + size));
    if (uniqueLetters.size === size) {
      return i + size;
    }
  }
  throw new Error("Couldn't find marker position");
}
