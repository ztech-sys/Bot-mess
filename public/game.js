let multiplier = 1.00;
let crashPoint = +(Math.random() * 8 + 1).toFixed(2); // x1 → x9
let flying = true;

const multiEl = document.getElementById("multiplier");
const planeEl = document.getElementById("plane");
const cashoutBtn = document.getElementById("cashout");

let height = 0;

const gameLoop = setInterval(() => {
  if (!flying) return;

  multiplier += 0.01;
  multiplier = +multiplier.toFixed(2);
  multiEl.innerText = "x" + multiplier;

  height += 2;
  planeEl.style.transform = `translate(${height}px, -${height}px)`;

  if (multiplier >= crashPoint) {
    flying = false;
    multiEl.innerText = "💥 NỔ x" + crashPoint;
    planeEl.innerText = "💥";
    cashoutBtn.disabled = true;
    clearInterval(gameLoop);
  }
}, 100);

cashoutBtn.onclick = () => {
  if (!flying) return;

  flying = false;
  multiEl.innerText = "✅ RÚT x" + multiplier;
  planeEl.innerText = "🏁";
  clearInterval(gameLoop);
};
