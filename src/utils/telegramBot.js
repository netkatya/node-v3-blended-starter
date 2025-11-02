import TelegramBot from 'node-telegram-bot-api';
import env from '../utils/env.js';
import { getUserByID } from '../services/userServices.js';
import { updateUser } from '../controllers/userController.js';

const bot = new TelegramBot(env('TELEGRAM_TOKEN'), { polling: true });
console.log('🤖 Telegram бот запущено (polling)');

bot.onText(/\/start (.+)/, async (msg, match) => {
  const userId = match[1];
  const chatId = msg.chat.id;

  try {
    const user = await getUserByID(userId);
    if (!user) {
      await bot.sendMessage(chatId, '⚠️ Не знайдено користувача.');
      return;
    }

    if (user.telegramChatId !== String(chatId)) {
      await updateUser(user._id, {
        telegramChatId: String(chatId),
        telegramLinked: true,
      });
    }

    await bot.sendMessage(
      chatId,
      `Привіт, ${msg.from.first_name}! ✅ Telegram підключено.`,
    );
    console.log(
      `✅ Користувач ${user.username} підключив Telegram (${chatId})`,
    );
  } catch (err) {
    console.error('Помилка Telegram:', err);
    await bot.sendMessage(
      chatId,
      '❌ Сталася помилка при підключенні Telegram.',
    );
  }
});

export default bot;
