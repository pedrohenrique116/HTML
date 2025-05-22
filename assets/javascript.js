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
   
