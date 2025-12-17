const express = require("express");
const WebSocket = require("ws");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () =>
  console.log("Server running on", PORT)
);

const wss = new WebSocket.Server({ server });

let room = {
  players: {},
  multiplier: 1,
  crash: 0,
  interval: null
};

function generateCrash() {
  return 1 + Math.random() * 5;
}

wss.on("connection", ws => {
  ws.on("message", msg => {
    const data = JSON.parse(msg);

    if (data.type === "JOIN") {
      room.players[data.user] = ws;
    }

    if (data.type === "START") {
      room.multiplier = 1;
      room.crash = generateCrash();

      room.interval = setInterval(() => {
        room.multiplier += 0.02;

        for (let u in room.players) {
          room.players[u].send(JSON.stringify({
            type: "UPDATE",
            m: room.multiplier
          }));
        }

        if (room.multiplier >= room.crash) {
          for (let u in room.players) {
            room.players[u].send(JSON.stringify({
              type: "CRASH",
              at: room.crash
            }));
          }
          clearInterval(room.interval);
        }
      }, 100);
    }
  });
})
