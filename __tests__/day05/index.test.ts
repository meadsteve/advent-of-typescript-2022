class Stack {
  private items: string[] = [];

  push(a: string) {
    this.items.push(a);
  }

  get prettyView(): string {
    return this.items
      .map((i) => `[${i}]`)
      .reverse()
      .join('\n');
  }

  pop(number: number): string[] {
    const popped = [];
    for (let i = 0; i < number; i++) {
      const item = this.items.pop();
      if (!item) {
        throw new Error("Can't pop an empty stack");
      }
      popped.push(item);
    }
    return popped;
  }
}

type Move = { amount: number; from: number; to: number };

class StackSet {
  private stacks: Stack[] = [];

  createStack(items: string[]) {
    const newStack = new Stack();
    items.reverse().forEach((i) => newStack.push(i));
    this.stacks.push(newStack);
  }

  get(pos: number): Stack {
    return this.stacks[pos - 1];
  }

  makeMove({ amount, from, to }: Move) {
    const items = this.get(from).pop(amount);
    items.forEach((i) => this.get(to).push(i));
  }
}

describe('day 5', () => {
  it('can move items onto a stack', async function () {
    const tower = new Stack();

    tower.push('A');
    tower.push('B');

    const expected = '[B]\n[A]';
    expect(tower.prettyView).toEqual(expected);
  });

  it('can move items off the top of a stack', async function () {
    const tower = new Stack();

    tower.push('A');
    tower.push('B');
    tower.push('C');

    const removed = tower.pop(2);
    expect(removed).toEqual(['C', 'B']);
    expect(tower.prettyView).toEqual('[A]');
  });

  it('build a set of stacks', async function () {
    const towers = new StackSet();
    towers.createStack(['N', 'Z']);
    towers.createStack(['D', 'C', 'M']);
    towers.createStack(['P']);

    expect(towers.get(1).prettyView).toEqual('[N]\n[Z]');
    expect(towers.get(2).prettyView).toEqual('[D]\n[C]\n[M]');
    expect(towers.get(3).prettyView).toEqual('[P]');
  });

  it('can apply moves to a set of stacks', async function () {
    const towers = new StackSet();
    towers.createStack(['N', 'Z']);
    towers.createStack(['D', 'C', 'M']);
    towers.createStack(['P']);

    towers.makeMove({ amount: 1, from: 2, to: 1 });

    expect(towers.get(1).prettyView).toEqual('[D]\n[N]\n[Z]');
    expect(towers.get(2).prettyView).toEqual('[C]\n[M]');
  });
});
