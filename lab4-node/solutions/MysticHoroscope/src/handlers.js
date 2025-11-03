import { getState, setState, clearState } from './state.js';
import { ZODIAC_SIGNS, TARO_LAYOUTS, GREETING_MESSAGE } from './constants.js';

const generateHoroscope = (sign) => {
  return `✨ Ежедневный гороскоп для знака ${sign}:\n\n` +
    `❤️ Любовь: Сегодня вас ждет романтическая встреча.\n` +
    `💼 Работа: Будьте внимательны к деталям в проектах.\n` +
    `💰 Финансы: Возможна неожиданная прибыль.\n` +
    `🌿 Здоровье: Отличный день для прогулок на свежем воздухе.\n\n` +
    `Счастливое число: 7\n` +
    `Цвет дня: Синий\n` +
    `Время силы: 18:00`;
};

const generateTaroReading = (layout) => {
  return `🔮 Ваш расклад Таро: "${layout}"\n\n` +
    `Карта 1: Влюбленные (Выбор, отношения)\n` +
    `Карта 2: Башня (Внезапные перемены)\n` +
    `Карта 3: Солнце (Успех, радость)\n\n` +
    `Интерпретация: Вам предстоит важный выбор, который приведет к переменам, но в итоге все закончится успехом.`;
};

const generateCompatibility = (sign1, sign2) => {
  return `💞 Совместимость: ${sign1} и ${sign2}\n\n` +
    `Любовь: 85% - отличная гармония.\n` +
    `Дружба: 95% - вы лучшие друзья.\n` +
    `Работа: 75% - вы продуктивная команда.\n\n` +
    `Сильные стороны: Взаимопонимание и поддержка.\n` +
    `Слабые стороны: Иногда возможны споры из-за упрямства.\n\n` +
    `Рекомендация: Больше прислушивайтесь друг к другу.`;
};


export const setupHandlers = (bot) => {
  bot.start((ctx) => {
    clearState(ctx.chat.id);
    ctx.reply(GREETING_MESSAGE);
  });

  bot.command('daily_horoscope', (ctx) => {
    setState(ctx.chat.id, { command: 'daily_horoscope', step: 1 });
    ctx.reply('Введите ваш знак зодиака:');
  });

  bot.command('taro', (ctx) => {
    setState(ctx.chat.id, { command: 'taro', step: 1 });
    ctx.replyWithHTML(
      'Выберите тип расклада:\n\n' +
      `1. <b>${TARO_LAYOUTS.day}</b>\n` +
      `2. <b>${TARO_LAYOUTS.love}</b>\n` +
      `3. <b>${TARO_LAYOUTS.problem}</b>\n\n` +
      'Отправьте цифру 1, 2 или 3.'
    );
  });

  bot.command('compatibility', (ctx) => {
    setState(ctx.chat.id, { command: 'compatibility', step: 1 });
    ctx.reply('Введите первый знак зодиака:');
  });

  bot.on('text', (ctx) => {
    const chatId = ctx.chat.id;
    const text = ctx.message.text.toLowerCase().trim();
    const state = getState(chatId);

    if (!state) {
      ctx.reply(GREETING_MESSAGE);
      return;
    }

    if (state.command === 'daily_horoscope') {
      if (ZODIAC_SIGNS.includes(text)) {
        const horoscope = generateHoroscope(text);
        ctx.replyWithHTML(horoscope);
        clearState(chatId);
      } else {
        ctx.reply('Неверный знак зодиака. Попробуйте еще раз:');
      }
    }

    else if (state.command === 'taro') {
      const layoutMap = { '1': 'day', '2': 'love', '3': 'problem' };
      const layoutKey = layoutMap[text];

      if (layoutKey) {
        const reading = generateTaroReading(TARO_LAYOUTS[layoutKey]);
        ctx.replyWithHTML(reading);
        clearState(chatId);
      } else {
        ctx.reply('Неверный выбор. Пожалуйста, отправьте цифру от 1 до 3.');
      }
    }
    else if (state.command === 'compatibility') {
      if (state.step === 1) {
        if (ZODIAC_SIGNS.includes(text)) {
          setState(chatId, { ...state, step: 2, sign1: text });
          ctx.reply('Отлично! Теперь введите второй знак зодиака:');
        } else {
          ctx.reply('Неверный знак зодиака. Введите первый знак еще раз:');
        }
      } else if (state.step === 2) {
        if (ZODIAC_SIGNS.includes(text)) {
          const compatibility = generateCompatibility(state.sign1, text);
          ctx.replyWithHTML(compatibility);
          clearState(chatId);
        } else {
          ctx.reply('Неверный знак зодиака. Введите второй знак еще раз:');
        }
      }
    }
  });
};