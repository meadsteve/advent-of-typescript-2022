import { helloWorld } from '../src/hello';

describe('hellos', () => {
  it('can say hello to the world', () => {
    expect(helloWorld()).toBe(`hello world`);
  });
});
