// server.js
const { Telegraf } = require("telegraf");
const express = require("express");

// Khởi tạo bot Telegram
const bot = new Telegraf(process.env.BOT_TOKEN);

// Lệnh /start
bot.start(ctx => {
  ctx.reply("✈️ Avia Master", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "▶️ CHƠI NGAY",
          web_app: { url: "https://mini-app-gqf1.onrender.com" }
        }
      ]]
    }
  });
});

// Launch bot (polling)
bot.launch({ webhook: false });
console.log("Telegram Mini-App bot running");

// Tạo server HTTP để Render coi là web service
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Mini-App bot is running ✅");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
