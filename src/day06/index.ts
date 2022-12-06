import { enumerate, slidingWindow, toAsyncGenerator } from '../asyncHelpers';
import { readLines } from '../fileHelpers';

export async function solvePartOne() {
  const line: string = (await (await readLines('src/day06/input.txt')).next())
    .value;
  const markerPosition = await findMarkerPosition(line);
  return markerPosition.toString();
}

export async function solvePartTwo() {
  const lines = readLines('src/day06/input.txt');
  return 'todo';
}

export async function findMarkerPosition(input: string) {
  const letterWindow = slidingWindow(toAsyncGenerator(input.split('')), 4);
  for await (const [position, letters] of enumerate(letterWindow)) {
    const uniqueLetters = new Set(letters);
    if (uniqueLetters.size === 4) {
      return position + 4;
    }
  }
  throw new Error("Couldn't find marker position");
}
