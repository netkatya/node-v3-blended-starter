import TelegramBot from 'node-telegram-bot-api';
import { env } from '../utils/env.js';
import { getUserByID, updateUserService } from '../services/userServices.js';

let bot;

if (env('NODE_ENV') === 'production') {
  bot = new TelegramBot(env('TELEGRAM_TOKEN'), { polling: true });
  console.log('🤖 Telegram bot has been launched (polling)');

  bot.onText(/\/start (.+)/, async (msg, match) => {
    const userId = match[1];
    const chatId = msg.chat.id;

    try {
      const user = await getUserByID(userId);
      if (!user) {
        await bot.sendMessage(chatId, '⚠️ user not found.');
        return;
      }

      if (!user.telegramChatId) {
        if (user.telegramChatId !== String(chatId)) {
          await updateUserService(user._id, {
            telegramChatId: String(chatId),
            telegramLinked: true,
          });
        }

        await bot.sendMessage(
          chatId,
          `Hello, ${msg.from.first_name}! ✅ Telegram connected.`,
        );
        console.log(`✅ User ${user.username} connected Telegram (${chatId})`);
      }
    } catch (err) {
      console.error('Telegram error:', err);
      await bot.sendMessage(
        chatId,
        '❌ An error occurred while connecting Telegram.',
      );
    }
  });
} else {
  console.log('⚠️ Telegram bot not launched (only for production environment)');
}

export { bot };

// Функція для відправки повідомлень через Telegram бот, parseMode= 'HTML' або "" - для текста без форматування
export const sendTelegramMessage = async (chatId, message, parseMode = '') => {
  try {
    await bot.sendMessage(chatId, message, { parse_mode: parseMode });
  } catch (err) {
    console.error('Error sending Telegram message:', err);
  }
};
