import { readLines } from '../fileHelpers';
import { largest, largestN } from '../asyncHelpers';

export async function* elfCalories(
  calorieList: AsyncGenerator<string>,
): AsyncGenerator<number> {
  let total = 0;
  for await (const calories of calorieList) {
    if (calories == '') {
      yield total;
      total = 0;
    } else {
      total += parseInt(calories, 10);
    }
  }
  yield total;
}

export async function solvePartOne() {
  const input = readLines('src/day01/input.txt');
  const calories = elfCalories(input);
  return (await largest(calories)).toString();
}

export async function solvePartTwo() {
  const input = readLines('src/day01/input.txt');
  const calories = elfCalories(input);
  const topThreeCalories = await largestN(calories, 3);
  return topThreeCalories.reduce((a, b) => a + b, 0).toString();
}
