const heartBtn = document.getElementById("heartBtn");
const start = document.getElementById("start");
const content = document.getElementById("content");

const rain = document.getElementById("rain");
const timerEl = document.getElementById("timer");

const leafGroup = document.getElementById("leafGroup");

// ✅ 19 días atrás (automático)
const startDate = new Date(Date.now() - 19 * 24 * 60 * 60 * 1000);

let timerInterval = null;
let rainInterval = null;

heartBtn.addEventListener("click", () => {
  start.classList.add("hidden");
  content.classList.remove("hidden");

  // Hojitas en copa corazón (SVG)
  buildLeavesSVG(220);

  // contador
  updateTimer();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  // lluvia suave
  clearInterval(rainInterval);
  rainInterval = setInterval(createDrop, 340);
});

function updateTimer(){
  const now = new Date();
  const diff = Math.max(0, now - startDate);

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  timerEl.textContent = `${days} días ${hours} horas ${mins} minutos ${secs} segundos`;
}

/* Lluvia */
function createDrop(){
  const el = document.createElement("div");
  el.className = "drop";
  el.textContent = pick(["💗","💖","💕","💘","❤️","💞"]);

  el.style.left = (Math.random() * 100) + "%";
  el.style.fontSize = (14 + Math.random() * 22) + "px";

  const duration = 2.8 + Math.random() * 2.6;
  el.style.animationDuration = duration + "s";

  rain.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

/* Árbol: hojas SVG en forma de copa-corazón */
function buildLeavesSVG(n){
  leafGroup.innerHTML = "";

  // zona donde van las hojas (copa)
  const cx = 260;
  const cy = 175;

  for(let i=0;i<n;i++){
    const p = randomPointInHeart();

    const x = cx + p.x * 95;
    const y = cy - p.y * 85;

    const s = 0.55 + Math.random()*1.15;
    const rot = 8 + Math.random()*40;
    const op = 0.35 + Math.random()*0.55;

    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#miniHeart");
    use.setAttribute("fill", "url(#leafPink)");
    use.setAttribute("opacity", op.toFixed(2));
    use.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(2)}) rotate(${rot.toFixed(0)})`);

    leafGroup.appendChild(use);
  }
}

// corazón matemático: (x^2 + y^2 - 1)^3 - x^2 y^3 <= 0
function randomPointInHeart(){
  while(true){
    const x = (Math.random()*2 - 1) * 1.2;
    const y = (Math.random()*2 - 1) * 1.2;
    const a = (x*x + y*y - 1);
    if((a*a*a) - (x*x*y*y*y) <= 0){
      return { x, y };
    }
  }
}


