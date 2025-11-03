import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';

describe('Bot Setup (bot.js)', () => {
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;

  beforeEach(() => {
    jest.resetModules(); 
  });

  afterEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = originalToken; 
    jest.restoreAllMocks(); 
  });

  
  test('should throw error if token is not provided', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;

    
    
    jest.unstable_mockModule('dotenv', () => ({
      default: {
        config: jest.fn(),
      },
    }));

    const { default: runBot } = await import('../src/bot.js');

    expect(() => {
      runBot();
    }).toThrow('TELEGRAM_BOT_TOKEN must be provided!');
  });

  
  test('should initialize and launch the bot when token is provided', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'fake-token';

    const mockLaunch = jest.fn();
    const mockTelegraf = jest.fn(() => ({ launch: mockLaunch, stop: jest.fn() }));
    const mockSetupHandlers = jest.fn();

    
    jest.unstable_mockModule('telegraf', () => ({ Telegraf: mockTelegraf }));
    jest.unstable_mockModule('../src/handlers.js', () => ({ setupHandlers: mockSetupHandlers }));
    jest.unstable_mockModule('dotenv', () => ({
      default: {
        config: jest.fn(),
      },
    }));

    const { default: runBot } = await import('../src/bot.js');
    runBot();

    expect(mockTelegraf).toHaveBeenCalledWith('fake-token');
    expect(mockSetupHandlers).toHaveBeenCalled();
    expect(mockLaunch).toHaveBeenCalled();
  });

  
  test('should register graceful stop handlers', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'fake-token';

    const processOnceSpy = jest.spyOn(process, 'once').mockImplementation(() => {});
    const mockStop = jest.fn();

    jest.unstable_mockModule('telegraf', () => ({
      Telegraf: jest.fn(() => ({ launch: jest.fn(), stop: mockStop })),
    }));
    jest.unstable_mockModule('../src/handlers.js', () => ({ setupHandlers: jest.fn() }));
    jest.unstable_mockModule('dotenv', () => ({
      default: {
        config: jest.fn(),
      },
    }));

    const { default: runBot } = await import('../src/bot.js');
    runBot();

    expect(processOnceSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    expect(processOnceSpy).toHaveBeenCalledWith('SIGTERM', expect.any(Function));

    const sigintCallback = processOnceSpy.mock.calls.find(call => call[0] === 'SIGINT')[1];
    sigintCallback();
    expect(mockStop).toHaveBeenCalledWith('SIGINT');

    const sigtermCallback = processOnceSpy.mock.calls.find(call => call[0] === 'SIGTERM')[1];
    sigtermCallback();
    expect(mockStop).toHaveBeenCalledWith('SIGTERM');
  });
});