import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { setupHandlers } from './handlers.js';

const runBot = () => {
  dotenv.config();
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN must be provided!');
  }

  const bot = new Telegraf(token);

  setupHandlers(bot);

  bot.launch();
  console.log('Бот запущен...');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default runBot;