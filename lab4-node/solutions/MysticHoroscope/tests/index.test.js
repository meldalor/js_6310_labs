import { describe, test, expect, jest, beforeEach } from '@jest/globals';

describe('Application Entry Point (index.js)', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should call runBot when executed', async () => {
    const mockRunBot = jest.fn();
    jest.unstable_mockModule('../src/bot.js', () => ({
      default: mockRunBot,
    }));

    await import('../src/index.js');
    
    expect(mockRunBot).toHaveBeenCalledTimes(1);
  });
});