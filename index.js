const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
  ctx.reply("✈️ Avia Master", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "▶️ CHƠI NGAY",
          web_app: {
            url: "https://mini-app-gqf1.onrender.com"
          }
        }
      ]]
    }
  });
});

bot.launch();
console.log("Telegram Mini-App bot running")
