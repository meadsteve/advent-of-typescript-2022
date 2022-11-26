import { helloWorld } from '../src/main';

describe('hellos', () => {
  it('can say hello to the world', () => {
    expect(helloWorld()).toBe(`hello world`);
  });
});
