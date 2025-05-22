// Estado do jogo
let gorilla = {
    health: 100,
    energy: 100,
    attackPower: 5,
    defensePower: 3,
    healPower: 10
};


// Array para representar os 100 humanos
let humans = [];


// Variáveis de controle do jogo
let turn = 0;
let gameOver = false;
let winner = null;
let logs = ["Novo jogo iniciado! Um gorila contra 100 humanos!"];


// Elementos do DOM
const healthBar = document.getElementById('health-bar');
const energyBar = document.getElementById('energy-bar');
const healthText = document.getElementById('health-text');
const energyText = document.getElementById('energy-text');
const humansCount = document.getElementById('humans-count');
const turnCounter = document.getElementById('turn-counter');
const gorillaElement = document.getElementById('gorilla');
const humansContainer = document.getElementById('humans-container');
const battleMessage = document.getElementById('battle-message');
const logContainer = document.getElementById('log');
const gameOverScreen = document.getElementById('game-over');
const winnerMessage = document.getElementById('winner-message');


// Botões
const attackBtn = document.getElementById('attack-btn');
const defendBtn = document.getElementById('defend-btn');
const healBtn = document.getElementById('heal-btn');
const resetBtn = document.getElementById('reset-btn');


// Inicializar o jogo
function initGame() {
    // Carregar estado do jogo do LocalStorage ou iniciar novo jogo
    const savedState = localStorage.getItem('gorillaVsHumans');
   
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            gorilla = state.gorilla;
            humans = state.humans;
            turn = state.turn;
            gameOver = state.gameOver;
            winner = state.winner;
            logs = state.logs;
           
            addLog("Jogo carregado do armazenamento local!");
        } catch (error) {
            console.error("Erro ao carregar o jogo:", error);
            resetGame();
        }
    } else {
        resetGame();
    }
   
    // Atualizar interface
    updateUI();
   }

   // Atualizar interface do usuário
function updateUI() {
    // Atualizar barras de status
    healthBar.style.width = `${gorilla.health}%`;
    energyBar.style.width = `${gorilla.energy}%`;
    healthText.textContent = `${gorilla.health}/100`;
    energyText.textContent = `${gorilla.energy}/100`;
   
    // Contar humanos vivos
    const aliveHumans = humans.filter(human => human.health > 0).length;
    humansCount.textContent = `${aliveHumans}/100`;
   
    // Atualizar contador de turnos
    turnCounter.textContent = turn;
   
    // Renderizar humanos
    renderHumans();

      // Atualizar logs
    updateLogs();
   
    // Atualizar estado dos botões
    updateButtons();
   
    // Salvar estado no LocalStorage
    saveGameState();
}


// Renderizar humanos
function renderHumans() {
    humansContainer.innerHTML = '';
   
    // Limitar a 50 humanos para performance
    const displayCount = Math.min(50, humans.length);
   
    for (let i = 0; i < displayCount; i++) {
        const human = humans[i];
        const humanElement = document.createElement('div');
        humanElement.className = `human ${human.health <= 0 ? 'defeated' : ''}`;
        humanElement.dataset.id = human.id;
        humansContainer.appendChild(humanElement);
    }
   
    // Adicionar contador se houver mais de 50 humanos
    if (humans.length > 50) {
        const counter = document.createElement('div');
        counter.className = 'humans-counter';
        counter.textContent = `+${humans.length - 50} humanos`;
        humansContainer.appendChild(counter);
    }
}


// Atualizar logs
function updateLogs() {
    // Usar innerHTML para atualizar os logs conforme requisito
    logContainer.innerHTML = '';
    logs.forEach(log => {
        logContainer.innerHTML += `<div class="log-entry">${log}</div>`;
    });
}


