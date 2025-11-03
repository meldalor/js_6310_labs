import { describe, test, expect, beforeEach } from '@jest/globals';
import { getState, setState, clearState, _clearAllStates } from '../src/state.js';

describe('State Manager', () => {
  beforeEach(() => {
    _clearAllStates();
  });

  test('should return undefined for a new user', () => {
    expect(getState(123)).toBeUndefined();
  });

  test('should set and get a state for a user', () => {
    const chatId = 123;
    const state = { command: 'test', step: 1 };
    setState(chatId, state);
    expect(getState(chatId)).toEqual(state);
  });

  test('should update an existing state', () => {
    const chatId = 123;
    setState(chatId, { command: 'test', step: 1 });
    setState(chatId, { command: 'test', step: 2, data: 'hello' });
    expect(getState(chatId)).toEqual({ command: 'test', step: 2, data: 'hello' });
  });

  test('should clear a state for a user', () => {
    const chatId = 123;
    setState(chatId, { command: 'test' });
    clearState(chatId);
    expect(getState(chatId)).toBeUndefined();
  });

  test('should handle multiple users independently', () => {
    const user1 = 111;
    const user2 = 222;
    const state1 = { command: 'horoscope' };
    const state2 = { command: 'taro' };

    setState(user1, state1);
    setState(user2, state2);

    expect(getState(user1)).toEqual(state1);
    expect(getState(user2)).toEqual(state2);

    clearState(user1);

    expect(getState(user1)).toBeUndefined();
    expect(getState(user2)).toEqual(state2);
  });
});