const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('8523020605:AAGw26U-GLQell81TD3xfOGvqqYz-MX1fFU', { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Bấm để chơi 👇', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: '🎮 CHƠI GAME',
          web_app: {
            url: 'https://mini-app-gqf1.onrender.com'
          }
        }
      ]]
    }
  });
})
