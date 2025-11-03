import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { setupHandlers } from '../src/handlers.js';
import { getState, setState, _clearAllStates } from '../src/state.js';
import { GREETING_MESSAGE } from '../src/constants.js';


const createMockContext = (text) => ({
  chat: { id: 12345 },
  message: { text },
  reply: jest.fn(),
  replyWithHTML: jest.fn(),
});

const createMockBot = () => {
  const handlers = {};
  return {
    start: (handler) => (handlers.start = handler),
    command: (command, handler) => (handlers[command] = handler),
    on: (event, handler) => (handlers[event] = handler),
    _trigger: (event, ctx) => handlers[event](ctx),
    _triggerCommand: (command, ctx) => handlers[command](ctx),
  };
};

describe('Bot Handlers', () => {
  let mockBot;

  beforeEach(() => {
    _clearAllStates();
    mockBot = createMockBot();
    setupHandlers(mockBot);
  });

  
  test('/start should clear state and send greeting', () => {
    const ctx = createMockContext('/start');
    setState(ctx.chat.id, { command: 'test' });
    mockBot._trigger('start', ctx);
    expect(getState(ctx.chat.id)).toBeUndefined();
    expect(ctx.reply).toHaveBeenCalledWith(GREETING_MESSAGE);
  });

  
  describe('/daily_horoscope', () => {
    test('should set state and ask for zodiac sign', () => {
      const ctx = createMockContext('/daily_horoscope');
      mockBot._triggerCommand('daily_horoscope', ctx);
      expect(getState(ctx.chat.id)).toEqual({ command: 'daily_horoscope', step: 1 });
      expect(ctx.reply).toHaveBeenCalledWith('Введите ваш знак зодиака:');
    });

    test('should return horoscope for a valid sign', () => {
      const ctx = createMockContext('овен');
      setState(ctx.chat.id, { command: 'daily_horoscope', step: 1 });
      mockBot._trigger('text', ctx);
      expect(ctx.replyWithHTML).toHaveBeenCalledWith(expect.stringContaining('Ежедневный гороскоп для знака овен:'));
      expect(getState(ctx.chat.id)).toBeUndefined();
    });

    test('should ask again for an invalid sign', () => {
      const ctx = createMockContext('незнак');
      setState(ctx.chat.id, { command: 'daily_horoscope', step: 1 });
      mockBot._trigger('text', ctx);
      expect(ctx.reply).toHaveBeenCalledWith('Неверный знак зодиака. Попробуйте еще раз:');
      expect(getState(ctx.chat.id)).toBeDefined();
    });
  });

  
  describe('/taro', () => {
    test('should set state and ask for layout', () => {
      const ctx = createMockContext('/taro');
      mockBot._triggerCommand('taro', ctx);
      expect(getState(ctx.chat.id)).toEqual({ command: 'taro', step: 1 });
      expect(ctx.replyWithHTML).toHaveBeenCalledWith(expect.stringContaining('Выберите тип расклада:'));
    });

    test('should return taro reading for a valid choice', () => {
      const ctx = createMockContext('1');
      setState(ctx.chat.id, { command: 'taro', step: 1 });
      mockBot._trigger('text', ctx);
      expect(ctx.replyWithHTML).toHaveBeenCalledWith(expect.stringContaining('Ваш расклад Таро: "Карта дня"'));
      expect(getState(ctx.chat.id)).toBeUndefined();
    });

    test('should ask again for an invalid choice', () => {
      const ctx = createMockContext('5');
      setState(ctx.chat.id, { command: 'taro', step: 1 });
      mockBot._trigger('text', ctx);
      expect(ctx.reply).toHaveBeenCalledWith('Неверный выбор. Пожалуйста, отправьте цифру от 1 до 3.');
      expect(getState(ctx.chat.id)).toBeDefined();
    });
  });

  
  describe('/compatibility', () => {
    test('should set state and ask for the first sign', () => {
      const ctx = createMockContext('/compatibility');
      mockBot._triggerCommand('compatibility', ctx);
      expect(getState(ctx.chat.id)).toEqual({ command: 'compatibility', step: 1 });
      expect(ctx.reply).toHaveBeenCalledWith('Введите первый знак зодиака:');
    });

    test('should ask for the second sign after a valid first sign', () => {
      const ctx = createMockContext('рак');
      setState(ctx.chat.id, { command: 'compatibility', step: 1 });
      mockBot._trigger('text', ctx);
      expect(getState(ctx.chat.id)).toEqual({ command: 'compatibility', step: 2, sign1: 'рак' });
      expect(ctx.reply).toHaveBeenCalledWith('Отлично! Теперь введите второй знак зодиака:');
    });

    test('should ask for the first sign again if it is invalid', () => {
      const ctx = createMockContext('незнак');
      setState(ctx.chat.id, { command: 'compatibility', step: 1 });
      mockBot._trigger('text', ctx);
      expect(ctx.reply).toHaveBeenCalledWith('Неверный знак зодиака. Введите первый знак еще раз:');
      expect(getState(ctx.chat.id).step).toBe(1);
    });

    test('should return compatibility after a valid second sign', () => {
      const ctx = createMockContext('лев');
      setState(ctx.chat.id, { command: 'compatibility', step: 2, sign1: 'рак' });
      mockBot._trigger('text', ctx);
      expect(ctx.replyWithHTML).toHaveBeenCalledWith(expect.stringContaining('Совместимость: рак и лев'));
      expect(getState(ctx.chat.id)).toBeUndefined();
    });

    test('should ask for the second sign again if it is invalid', () => {
      const ctx = createMockContext('незнак');
      setState(ctx.chat.id, { command: 'compatibility', step: 2, sign1: 'рак' });
      mockBot._trigger('text', ctx);
      expect(ctx.reply).toHaveBeenCalledWith('Неверный знак зодиака. Введите второй знак еще раз:');
      expect(getState(ctx.chat.id).step).toBe(2);
    });
  });

  
  test('should send greeting on unexpected text when state is empty', () => {
    const ctx = createMockContext('привет');
    mockBot._trigger('text', ctx);
    expect(ctx.reply).toHaveBeenCalledWith(GREETING_MESSAGE);
  });
  
  test('should do nothing for a text message with an unhandled state command', () => {
    const ctx = createMockContext('some text');
    setState(ctx.chat.id, { command: 'unhandled_command' }); 
    mockBot._trigger('text', ctx);
    expect(ctx.reply).not.toHaveBeenCalled();
    expect(ctx.replyWithHTML).not.toHaveBeenCalled();
  });
});