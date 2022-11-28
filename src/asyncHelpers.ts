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
): Promise<Iterable<T>> {
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
