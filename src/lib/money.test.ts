import { describe, expect, it } from 'vitest';
import { splitExpense } from './money';

describe('splitExpense', () => {
  it('splits cents evenly and distributes the remainder deterministically', () => {
    expect(splitExpense(1000, ['a', 'b', 'c'])).toEqual({ a: 334, b: 333, c: 333 });
  });
});
