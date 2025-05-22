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
    
    // Verificar se o jogo já estava terminado
    if (gameOver) {
        showGameOver();
    }
}

// Resetar o jogo
function resetGame() {
    gorilla = {
        health: 100,
        energy: 100,
        attackPower: 5,
        defensePower: 3,
        healPower: 10
    };
    
    humans = [];
    for (let i = 0; i < 100; i++) {
        humans.push({
            id: i,
            health: 10,
            attackPower: 1
        });
    }
    
    turn = 0;
    gameOver = false;
    winner = null;
    logs = ["Novo jogo iniciado! Um gorila contra 100 humanos!"];
    
    // Limpar LocalStorage
    localStorage.removeItem('gorillaVsHumans');
    
    // Esconder tela de game over
    gameOverScreen.classList.add('hidden');
    
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

// Adicionar log
function addLog(message) {
    logs.unshift(message);
    
    // Limitar a 10 logs
    if (logs.length > 10) {
        logs = logs.slice(0, 10);
    }
    
    // Atualizar div de log usando innerHTML
    updateLogs();
}

// Atualizar estado dos botões
function updateButtons() {
    attackBtn.disabled = gameOver || gorilla.energy < 20;
    defendBtn.disabled = gameOver || gorilla.energy < 15;
    healBtn.disabled = gameOver || gorilla.energy < 30;
    
    // Adicionar classe de aviso para energia insuficiente
    const attackCost = attackBtn.querySelector('.energy-cost');
    const defendCost = defendBtn.querySelector('.energy-cost');
    const healCost = healBtn.querySelector('.energy-cost');
    
    attackCost.className = `energy-cost ${gorilla.energy < 20 ? 'energy-warning' : ''}`;
    defendCost.className = `energy-cost ${gorilla.energy < 15 ? 'energy-warning' : ''}`;
    healCost.className = `energy-cost ${gorilla.energy < 30 ? 'energy-warning' : ''}`;
}

// Salvar estado do jogo
function saveGameState() {
    if (turn > 0) {
        const gameState = {
            gorilla,
            humans,
            turn,
            gameOver,
            winner,
            logs
        };
        
        localStorage.setItem('gorillaVsHumans', JSON.stringify(gameState));
        console.log('Jogo salvo no LocalStorage');
    }
}

// Verificar fim de jogo
function checkGameOver() {
    if (gorilla.health <= 0) {
        gameOver = true;
        winner = 'humans';
        addLog("GAME OVER! Os humanos venceram!");
        showGameOver();
        saveGameState(); // Salvar estado final
        return true;
    }
    
    const aliveHumans = humans.filter(human => human.health > 0).length;
    if (aliveHumans === 0) {
        gameOver = true;
        winner = 'gorilla';
        addLog("GAME OVER! O gorila venceu!");
        showGameOver();
        saveGameState(); // Salvar estado final
        return true;
    }
    
    return false;
}

// Mostrar tela de game over
function showGameOver() {
    gameOverScreen.classList.remove('hidden');
    
    if (winner === 'gorilla') {
        winnerMessage.innerHTML = `
            <p>O gorila venceu a batalha!</p>
            <p>Todos os 100 humanos foram derrotados.</p>
            <p>A selva permanece sob o domínio do poderoso gorila!</p>
        `;
    } else {
        winnerMessage.innerHTML = `
            <p>Os humanos venceram a batalha!</p>
            <p>O gorila foi derrotado pela força dos números.</p>
            <p>A humanidade prevaleceu, mas a que custo?</p>
        `;
    }
}

// Ação: Gorila ataca
function gorillaAttack() {
    if (gameOver || gorilla.energy < 20) return;
    
    // Incrementar turno
    turn++;
    
    // Reduzir energia
    gorilla.energy = Math.max(0, gorilla.energy - 20);
    
    // Filtrar humanos vivos
    const aliveHumans = humans.filter(human => human.health > 0);
    if (aliveHumans.length === 0) return;
    
    // Selecionar até 10 humanos aleatoriamente
    const targetCount = Math.min(10, aliveHumans.length);
    const targets = [...aliveHumans]
        .sort(() => Math.random() - 0.5)
        .slice(0, targetCount);
    
    // Aplicar dano aos humanos selecionados
    let defeatedCount = 0;
    
    humans = humans.map(human => {
        if (targets.some(target => target.id === human.id)) {
            const newHealth = Math.max(0, human.health - gorilla.attackPower);
            if (newHealth <= 0 && human.health > 0) {
                defeatedCount++;
            }
            return {
                ...human,
                health: newHealth
            };
        }
        return human;
    });
    
    // Adicionar animação de ataque
    gorillaElement.classList.add('attacking');
    setTimeout(() => {
        gorillaElement.classList.remove('attacking');
    }, 1000);
    
    // Mostrar mensagem de batalha
    battleMessage.textContent = `Gorila atacou e derrotou ${defeatedCount} humanos!`;
    battleMessage.style.opacity = 1;
    setTimeout(() => {
        battleMessage.style.opacity = 0;
    }, 2000);
    
    // Adicionar log
    addLog(`Gorila atacou e derrotou ${defeatedCount} humanos!`);
    
    // Atualizar interface
    updateUI();
    
    // Verificar fim de jogo
    if (!checkGameOver()) {
        // Ataque dos humanos após um delay
        setTimeout(humansAttack, 1000);
    }
}

// Ação: Gorila defende
function gorillaDefend() {
    if (gameOver || gorilla.energy < 15) return;
    
    // Incrementar turno
    turn++;
    
    // Reduzir energia e aumentar defesa
    gorilla.energy = Math.max(0, gorilla.energy - 15);
    gorilla.defensePower += 2;
    
    // Adicionar animação de defesa
    gorillaElement.classList.add('defending');
    setTimeout(() => {
        gorillaElement.classList.remove('defending');
    }, 1000);
    
    // Mostrar mensagem de batalha
    battleMessage.textContent = "Gorila aumentou sua defesa!";
    battleMessage.style.opacity = 1;
    setTimeout(() => {
        battleMessage.style.opacity = 0;
    }, 2000);
    
    // Adicionar log
    addLog("Gorila aumentou sua defesa!");
    
    // Atualizar interface
    updateUI();
    
    // Verificar fim de jogo
    if (!checkGameOver()) {
        // Ataque dos humanos após um delay
        setTimeout(humansAttack, 1000);
    }
}

// Ação: Gorila cura
function gorillaHeal() {
    if (gameOver || gorilla.energy < 30) return;
    
    // Incrementar turno
    turn++;
    
    // Reduzir energia e aumentar vida
    gorilla.energy = Math.max(0, gorilla.energy - 30);
    gorilla.health = Math.min(100, gorilla.health + gorilla.healPower);
    
    // Adicionar animação de cura
    gorillaElement.classList.add('healing');
    setTimeout(() => {
        gorillaElement.classList.remove('healing');
    }, 1000);
    
    // Mostrar mensagem de batalha
    battleMessage.textContent = `Gorila recuperou ${gorilla.healPower} pontos de vida!`;
    battleMessage.style.opacity = 1;
    setTimeout(() => {
        battleMessage.style.opacity = 0;
    }, 2000);
    
    // Adicionar log
    addLog(`Gorila recuperou ${gorilla.healPower} pontos de vida!`);
    
    // Atualizar interface
    updateUI();
    
    // Verificar fim de jogo
    if (!checkGameOver()) {
        // Ataque dos humanos após um delay
        setTimeout(humansAttack, 1000);
    }
}

// Ação: Humanos atacam
function humansAttack() {
    if (gameOver) return;
    
    // Filtrar humanos vivos
    const aliveHumans = humans.filter(human => human.health > 0);
    
    // Calcular dano total
    const totalDamage = aliveHumans.reduce((acc, human) => acc + human.attackPower, 0);
    
    // Aplicar defesa do gorila
    const finalDamage = Math.max(1, totalDamage - gorilla.defensePower);
    
    // Reduzir vida do gorila
    gorilla.health = Math.max(0, gorilla.health - finalDamage);
    
    // Adicionar animação de dano
    gorillaElement.classList.add('hit');
    setTimeout(() => {
        gorillaElement.classList.remove('hit');
    }, 500);
    
    // Mostrar mensagem de batalha
    battleMessage.textContent = `${aliveHumans.length} humanos atacaram o gorila causando ${finalDamage} de dano!`;
    battleMessage.style.opacity = 1;
    setTimeout(() => {
        battleMessage.style.opacity = 0;
    }, 2000);
    
    // Adicionar log
    addLog(`${aliveHumans.length} humanos atacaram o gorila causando ${finalDamage} de dano!`);
    
    // Atualizar interface
    updateUI();
    
    // Verificar fim de jogo
    checkGameOver();
}

// Recuperação automática de energia
function recoverEnergy() {
    if (!gameOver) {
        gorilla.energy = Math.min(100, gorilla.energy + 5);
        updateUI();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o jogo
    initGame();
    
    // Adicionar event listeners aos botões
    attackBtn.addEventListener('click', gorillaAttack);
    defendBtn.addEventListener('click', gorillaDefend);
    healBtn.addEventListener('click', gorillaHeal);
    resetBtn.addEventListener('click', resetGame);
    
    // Iniciar recuperação automática de energia
    setInterval(recoverEnergy, 3000);
});
