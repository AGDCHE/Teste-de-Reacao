const somSemaforo = document.getElementById("somSemaforo");
const somFinish = document.getElementById("somFinish");

let estado = "inicial";
// inicial
// semaforo
// valendo
// aguardando-reinicio

let timeouts = [];
let cronometroInterval = null;

let startTime = 0;
let elapsedTime = 0;

const cronometroDisplay = document.getElementById("stopwatch");
const startButton = document.querySelector("button");
const restartButton = document.getElementById("restart-button");
const texto = document.querySelector(".text");

const luzes = [
  "red","red2","red3","red4","red5",
  "red6","red7","red8","red9","red10"
].map(id => document.getElementById(id));

document.body.addEventListener("click", controlarClique);

function startTest() {

  if (estado !== "inicial") return;

  estado = "semaforo";
  startButton.style.display = "none";
  restartButton.style.display = "none";
  texto.innerHTML = "Clique somente quando as luzes se apagarem!";

  resetLuzes();

  // Acende luzes progressivamente
  for (let i = 0; i < 5; i++) {
    timeouts.push(
      setTimeout(() => {
        luzes[i * 2].style.backgroundColor = "red";
        luzes[i * 2 + 1].style.backgroundColor = "red";
        tocarSomSemaforo()
      }, i * 1000)
    );
  }

  const randomTime = Math.floor(Math.random() * 5000) + 5000;

  timeouts.push(
    setTimeout(() => {
      resetLuzes();
      texto.innerHTML = "";
      iniciarCronometro();
      estado = "valendo";
      tocarSomFinish();
    }, randomTime)
  );
}

function controlarClique(e) {

  // Se clicou em botão (ou dentro dele), ignora
  if (e.target.closest("button")) return;

  if (estado === "semaforo") {
    punicao();
    return;
  }

  if (estado === "valendo") {
    pararCronometro();
    restartButton.style.display = "block"; // 🔥 botão aparece no mesmo clique
    estado = "aguardando-reinicio";
    return;
  }

  // Se estiver aguardando reinício, não faz nada
}

function punicao() {
  limparTimeouts();
  resetLuzes();
  texto.innerHTML = "Você clicou antes da hora! 😅";
  startButton.style.display = "block";
  estado = "inicial";
}

function iniciarCronometro() {

  startTime = Date.now();

  cronometroInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    cronometroDisplay.textContent = formatarTempo(elapsedTime);
  }, 10);
}

function pararCronometro() {
  clearInterval(cronometroInterval);
  mostrarMensagemFinal();
}

function formatarTempo(ms) {
  const segundos = Math.floor(ms / 1000);
  const milesimos = ms % 1000;

  return `${String(segundos).padStart(2, "0")}:${String(milesimos).padStart(3, "0")}`;
}

function mostrarMensagemFinal() {

  if (elapsedTime <= 200) {
    texto.innerHTML = "Reflexo de piloto de F1! 🏎️🔥";
  } else if (elapsedTime <= 300) {
    texto.innerHTML = "Super rápido! ⚡";
  } else if (elapsedTime <= 400) {
    texto.innerHTML = "Boa reação!";
  } else if (elapsedTime <= 500) {
    texto.innerHTML = "Pode melhorar!";
  } else {
    texto.innerHTML = "Treine mais um pouco 😄";
  }
}

function restart() {

  clearInterval(cronometroInterval);
  limparTimeouts();

  elapsedTime = 0;
  cronometroDisplay.textContent = "00:000";

  restartButton.style.display = "none";
  startButton.style.display = "block";
  texto.innerHTML = "";

  resetLuzes();

  estado = "inicial";
}

function resetLuzes() {
  luzes.forEach(luz => {
    luz.style.backgroundColor = "#2b2b2b";
  });
}

function limparTimeouts() {
  timeouts.forEach(clearTimeout);
  timeouts = [];
}

function tocarSomSemaforo() {
  somSemaforo.currentTime = 0;
  somSemaforo.play();
}

function tocarSomFinish() {
  somFinish.currentTime = 0;
  somFinish.play();
}