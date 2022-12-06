// Stolen from https://stackoverflow.com/questions/52489261/typescript-can-i-define-an-n-length-tuple-type
export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
  length: TLength;
};

export async function* aMap<TIn, TOut>(
  input: AsyncGenerator<TIn>,
  fn: (x: TIn) => TOut,
): AsyncGenerator<TOut> {
  for await (const x of input) {
    yield fn(x);
  }
}

export async function* enumerate<T>(
  input: AsyncGenerator<T>,
): AsyncGenerator<[number, T]> {
  let counter = 0;
  for await (const x of input) {
    yield [counter, x];
    counter++;
  }
}

export async function* aFilter<T>(
  input: AsyncGenerator<T>,
  fn: (x: T) => boolean,
): AsyncGenerator<T> {
  for await (const x of input) {
    if (fn(x)) {
      yield x;
    }
  }
}

export async function aReduce<TIn, TOut>(
  input: AsyncGenerator<TIn>,
  fn: (acc: TOut, n: TIn) => TOut,
  initial: TOut | undefined = undefined,
): Promise<TOut> {
  let acc = initial !== undefined ? initial : (await input.next()).value;
  for await (const x of input) {
    acc = fn(acc, x);
  }
  return acc;
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

export async function* slidingWindow<T, TLength extends number>(
  input: AsyncGenerator<T>,
  windowSize: TLength,
): AsyncGenerator<Tuple<T, TLength>> {
  const window: T[] = [];
  for await (const current of input) {
    window.push(current);
    if (window.length === windowSize) {
      yield [...window] as Tuple<T, TLength>;
      window.shift();
    }
  }
}

export async function* groupsOfN<T, TLength extends number>(
  input: AsyncGenerator<T>,
  groupSize: TLength,
): AsyncGenerator<Tuple<T, TLength>> {
  let group: T[] = [];
  for await (const current of input) {
    group.push(current);
    if (group.length === groupSize) {
      yield group as Tuple<T, TLength>;
      group = [];
    }
  }
}

export async function largest(input: AsyncGenerator<number>): Promise<number> {
  return aReduce(input, (a, b) => Math.max(a, b));
}

export async function sum(input: AsyncGenerator<number>): Promise<number> {
  return aReduce(input, (total, n) => total + n);
}

export async function count(input: AsyncGenerator<any>): Promise<number> {
  return aReduce(input, (total, _) => total + 1, 0);
}

export async function largestN<TLength extends number>(
  input: AsyncGenerator<number>,
  number: TLength,
): Promise<Tuple<number, TLength>> {
  const largest = new Array<number>(number) as Tuple<number, TLength>;
  for (let i = 0; i < number; i++) {
    const next = await input.next();
    if (next.done) {
      return largest;
    }
    largest[i] = next.value;
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

export async function takeUntil<T>(
  input: AsyncGenerator<T>,
  fn: (l: T) => boolean,
): Promise<T[]> {
  const output: T[] = [];
  for await (const item of input) {
    if (fn(item)) {
      return output;
    }
    output.push(item);
  }
  throw new Error('End criteria not met');
}
