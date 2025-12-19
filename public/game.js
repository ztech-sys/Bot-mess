const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const SEA_HEIGHT = canvas.height * 0.3;

// Telegram user
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe?.user;
console.log("USER:", user?.id);

// Load plane image
const planeImg = new Image();
planeImg.src = "assets/plane.png";

let plane = {
  x: 120,
  y: canvas.height / 2,
  vy: 0,
  angle: 0
};

let xuBay = 10000;

const gravity = 0.6;
const lift = -6;

let tap = 0;
document.getElementById("flyBtn").onclick = () => {
  plane.vy += lift;
  tap++;
  if (tap >= 5) {
    plane.angle = -30;
    tap = 0;
  }
};

// mốc tiền (thấp nhiều – cao ít)
const multipliers = [
  { v: 1.1, w: 40 },
  { v: 1.2, w: 35 },
  { v: 1.3, w: 30 },
  { v: 1.5, w: 20 },
  { v: 2, w: 10 },
  { v: 3, w: 4 },
  { v: 5, w: 1 }
];

function randMul() {
  const sum = multipliers.reduce((a,b)=>a+b.w,0);
  let r = Math.random()*sum;
  for (const m of multipliers) {
    if ((r -= m.w) <= 0) return m.v;
  }
}

let tick = 0;

function update() {
  plane.vy += gravity;
  plane.y += plane.vy;
  plane.angle = Math.max(-45, Math.min(45, plane.vy * 4));

  // rơi biển
  if (plane.y > canvas.height - SEA_HEIGHT) {
    alert("🌊 RƠI BIỂN – THUA");
    location.reload();
    return;
  }

  // random mốc tiền / bom
  if (++tick % 120 === 0) {
    if (Math.random() < 0.25) {
      alert("💣 TRÚNG BOM – THUA");
      location.reload();
      return;
    }
    const m = randMul();
    xuBay = Math.floor(xuBay * m);
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // plane
  ctx.save();
  ctx.translate(plane.x, plane.y);
  ctx.rotate(plane.angle * Math.PI/180);
  ctx.drawImage(planeImg, -25, -15, 50, 30);
  ctx.restore();

  // HUD
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`XU ĐANG BAY: ${xuBay}`, 20, 30);
}

update();
