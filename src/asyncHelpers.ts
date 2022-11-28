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
