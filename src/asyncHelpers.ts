export async function* aMap<TIn, TOut>(
  input: AsyncGenerator<TIn>,
  fn: (x: TIn) => TOut,
): AsyncGenerator<TOut> {
  for await (const x of input) {
    yield fn(x);
  }
}

export async function* toAsyncGenerator<T>(
  input: Iterable<T>,
): AsyncGenerator<T> {
  for (const item of input) {
    yield item;
  }
}

export async function fromAsyncGenerator<T>(
  input: AsyncGenerator<T>,
): Promise<T[]> {
  const result: T[] = [];
  for await (const item of input) {
    result.push(item);
  }
  return result;
}

export async function* slidingWindow<T>(
  input: AsyncGenerator<T>,
  windowSize: number,
): AsyncGenerator<T[]> {
  const window: T[] = [];
  for await (const current of input) {
    window.push(current);
    if (window.length === windowSize) {
      yield [...window];
      window.shift();
    }
  }
}

export async function largest(input: AsyncGenerator<number>): Promise<number> {
  let largest = (await input.next()).value;
  for await (const current of input) {
    if (current > largest) {
      largest = current;
    }
  }
  return largest;
}

export async function sum(input: AsyncGenerator<number>): Promise<number> {
  let total = 0;
  for await (const current of input) {
    total += current;
  }
  return total;
}

export async function largestN(
  input: AsyncGenerator<number>,
  number: number,
): Promise<number[]> {
  const largest: number[] = [];
  for (let i = 0; i < number; i++) {
    const next = await input.next();
    if (next.done) {
      return largest;
    }
    largest.push(next.value);
  }
  for await (let current of input) {
    for (let i = 0; i < number; i++) {
      if (current > largest[i]) {
        // Swap the variables so we keep this new largest number
        // and check if the previous one is larger than the others
        [largest[i], current] = [current, largest[i]];
      }
    }
  }
  return largest;
}

export async function* groupsOfN<T>(
  input: AsyncGenerator<T>,
  groupSize: number,
): AsyncGenerator<T[]> {
  let group: T[] = [];
  for await (const current of input) {
    group.push(current);
    if (group.length === groupSize) {
      yield group;
      group = [];
    }
  }
}
