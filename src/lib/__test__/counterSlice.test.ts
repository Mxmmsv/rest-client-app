import { describe, it, expect } from 'vitest';

import counterReducer, { increment, decrement } from '../store/slice/counterSlice';

describe('counterSlice', () => {
  it('should return the initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({ value: 5 });
  });

  it('should handle increment', () => {
    const initialState = { value: 5 };
    const nextState = counterReducer(initialState, increment());
    expect(nextState.value).toBe(6);
  });

  it('should handle decrement', () => {
    const initialState = { value: 5 };
    const nextState = counterReducer(initialState, decrement());
    expect(nextState.value).toBe(4);
  });
});
