const heartBtn = document.getElementById("heartBtn");
const start = document.getElementById("start");
const content = document.getElementById("content");

const rain = document.getElementById("rain");
const timerEl = document.getElementById("timer");
const leavesBox = document.getElementById("leaves");

// ✅ 19 días atrás desde hoy (automático)
const startDate = new Date(Date.now() - 19 * 24 * 60 * 60 * 1000);

let timerInterval = null;
let rainInterval = null;

heartBtn.addEventListener("click", () => {
  start.classList.add("hidden");
  content.classList.remove("hidden");

  // crea hojas una sola vez
  makeLeaves(150);

  // contador
  updateTimer();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  // lluvia
  if (rainInterval) clearInterval(rainInterval);
  rainInterval = setInterval(createDrop, 170);
});

function updateTimer(){
  const now = new Date();
  let diff = Math.max(0, now - startDate);

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  timerEl.textContent = `${days} días ${hours} horas ${mins} minutos ${secs} segundos`;
}

/* Lluvia de corazones */
function createDrop(){
  const el = document.createElement("div");
  el.className = "drop";
  el.textContent = pick(["💗","💖","💕","💘","❤️","💞"]);

  el.style.left = (Math.random() * 100) + "%";
  el.style.fontSize = (14 + Math.random() * 22) + "px";

  const duration = 2.6 + Math.random() * 2.2;
  el.style.animationDuration = duration + "s";

  rain.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Hojas (corazoncitos) formando copa */
function makeLeaves(n){
  leavesBox.innerHTML = "";

  const w = leavesBox.clientWidth;
  const h = leavesBox.clientHeight;

  for(let i=0;i<n;i++){
    const leaf = document.createElement("div");
    leaf.className = "leaf";

    // zona base
    let x = (w * 0.18) + Math.random() * (w * 0.64);
    let y = (h * 0.06) + Math.random() * (h * 0.80);

    // “recorte” para que parezca corazón/árbol: estrecha hacia abajo y bordes
    const t = y / h; // 0 arriba, 1 abajo
    const centerX = w / 2;
    const dx = (x - centerX) / centerX;

    x = x - Math.abs(dx) * (10 + 30 * t);

    leaf.style.left = x + "px";
    leaf.style.top = y + "px";

    const s = 0.55 + Math.random() * 1.25;
    leaf.style.transform = `rotate(45deg) scale(${s.toFixed(2)})`;
    leaf.style.opacity = (0.55 + Math.random() * 0.40).toFixed(2);

    leavesBox.appendChild(leaf);
  }
}
