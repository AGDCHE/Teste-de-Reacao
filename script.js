function startTest() {
    /* light     Red */
    const lightRed = document.getElementById('red');
    const lightRed2 = document.getElementById('red2');
    const lightRed3 = document.getElementById('red3');
    const lightRed4 = document.getElementById('red4');
    const lightRed5 = document.getElementById('red5');
    const lightRed6 = document.getElementById('red6');
    const lightRed7 = document.getElementById('red7');
    const lightRed8 = document.getElementById('red8');
    const lightRed9 = document.getElementById('red9');
    const lightRed10 = document.getElementById('red10');
    /* light     Red */

    const corOriginal = '#2b2b2b';
    const novaCor = 'red'; // A cor que o círculo vai assumir

    // Muda a cor do círculo imediatamente
    lightRed.style.backgroundColor = corOriginal;
    lightRed2.style.backgroundColor = corOriginal;
    lightRed3.style.backgroundColor = corOriginal;
    lightRed4.style.backgroundColor = corOriginal;
    lightRed5.style.backgroundColor = corOriginal;
    lightRed6.style.backgroundColor = corOriginal;
    lightRed7.style.backgroundColor = corOriginal;
    lightRed8.style.backgroundColor = corOriginal;
    lightRed9.style.backgroundColor = corOriginal;
    lightRed10.style.backgroundColor = corOriginal;
    // Muda a cor do círculo imediatamente  

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomTime = randomNumber(5000, 10000);

    // Define um temporizador para voltar à cor original após o tempo determinado
    setTimeout(() => {
        lightRed.style.backgroundColor = novaCor;
        lightRed2.style.backgroundColor = novaCor;
        document.querySelector(".text").innerHTML = "clique na tela quando as luzes se apagarem!";
        document.querySelector('button').style.display = 'none';
    }, 0);
    setTimeout(() => {
        lightRed3.style.backgroundColor = novaCor;
        lightRed4.style.backgroundColor = novaCor;
    }, 1000);
    setTimeout(() => {
        lightRed5.style.backgroundColor = novaCor;
        lightRed6.style.backgroundColor = novaCor;
    }, 2000);
    setTimeout(() => {
        lightRed7.style.backgroundColor = novaCor;
        lightRed8.style.backgroundColor = novaCor;
    }, 3000);
    setTimeout(() => {
        lightRed9.style.backgroundColor = novaCor;
        lightRed10.style.backgroundColor = novaCor;
    }, 4000);
    setTimeout(() => {
        pararCronometro();
        lightRed.style.backgroundColor = corOriginal;
        lightRed2.style.backgroundColor = corOriginal;
        lightRed3.style.backgroundColor = corOriginal;
        lightRed4.style.backgroundColor = corOriginal;
        lightRed5.style.backgroundColor = corOriginal;
        lightRed6.style.backgroundColor = corOriginal;
        lightRed7.style.backgroundColor = corOriginal;
        lightRed8.style.backgroundColor = corOriginal;
        lightRed9.style.backgroundColor = corOriginal;
        lightRed10.style.backgroundColor = corOriginal;
        document.querySelector(".text").innerHTML = ''
        iniciarCronometro();
    }, randomTime);
}

let startTime;
let elapsedTime = 0;
let isRunning = false;
let segundos = 0;
let milesimos = 0;
let cronometroInterval;

// Referência ao elemento HTML onde o tempo será exibido
const cronometroDisplay = document.getElementById('stopwatch');
// Função para formatar o tempo com zero à esquerda
function formatarTempo(valor) {
    return valor < 10 ? `0${valor}` : valor
}

// Função que atualiza o cronômetro
function atualizarCronometro() {
    milesimos += 19;
    if (milesimos >= 1000) {
        milesimos -= 1000;
        segundos++;
    }

    const segundosFormatados = formatarTempo(segundos);
    const milesimosFormatados = formatarTempo(milesimos);

    return `${segundosFormatados}:${milesimosFormatados}`;
}

// Inicia o cronômetro com setInterval
function iniciarCronometro() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        cronometroInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            cronometroDisplay.textContent = atualizarCronometro(elapsedTime);
        }, 19); // Atualiza a cada 10 milissegundos
        isRunning = true;
    }
}

function pararCronometro() {
    document.body.addEventListener("click", pararCronometro);

    if (isRunning) {
        clearInterval(cronometroInterval);
        isRunning = false;
        cronometroDisplay.textContent = formatarTempo(segundos) + ":" + formatarTempo(milesimos);
        console.log("O cronômetro foi parado.");
        document.getElementById("stopwatch").style.display = 'block';
        document.getElementById('restart-button').style.display = 'block';
        document.body.removeEventListener("click", pararCronometro);
    }
    if (elapsedTime <= 200) {
        document.querySelector(".text").innerHTML = 'A reação de um piloto de F1 é de 200 ms!<br>Que reflexo rápido! Impressionante!<br>';
    } else if (elapsedTime >= 200 && elapsedTime <= 300) {
        document.querySelector(".text").innerHTML = 'Você é super-rápido(a)! <br> Quase no nível profissional!<br>';
    } else if (elapsedTime >= 300 && elapsedTime <= 400) {
        document.querySelector(".text").innerHTML = 'Com um tempo de reação desses, você já está à frente da maioria.';
    } else if (elapsedTime >= 400 && elapsedTime <= 500) {
        document.querySelector(".text").innerHTML = 'A diferença entre você e um piloto de F1 está em apenas alguns milissegundos.';
    } else {
        document.querySelector(".text").innerHTML = 'A sua Reação não é tão boa para ser um piloto de F1.';
    }
}

function restart() {
    clearInterval(cronometroInterval);
    elapsedTime = 0;
    segundos = 0;
    milesimos = 0;
    cronometroInterval = null;
    isRunning = false;
    cronometroDisplay.textContent = '00:000';
    document.getElementById('restart-button').style.display = 'none';
    document.querySelector("button").style.display = 'block';
    document.querySelector(".text").innerHTML = '';
}