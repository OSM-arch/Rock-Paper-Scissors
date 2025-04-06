const options = document.querySelectorAll('.option');
const scoreValue = document.querySelectorAll('.score-value');
const winnerMessage = document.querySelector('.winner-message');
let playerScore = 0;
let computerScore = 0;
let resetGame = false;
const WIN_SCORE = 5;

// Computer Choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const random = Math.floor(Math.random() * (3));
    return choices[random];
}

// Display player, computer choices
function displayChoices(playerChoice, computerChoice) {
    const playerIcon = document.getElementById('player-choice').children[0];
    const computerIcon = document.getElementById('computer-choice').children[0];
    const icons = {
        rock: 'fas fa-hand-back-fist',
        paper: 'fas fa-hand',
        scissors: 'fas fa-hand-scissors'
    };
    playerIcon.className = icons[playerChoice];
    computerIcon.className = icons[computerChoice];
}

// Set Score
function score(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return;

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (winConditions[playerChoice] === computerChoice) {
        playerScore++;
    } else {
        computerScore++;
    }

    scoreValue[0].textContent = playerScore;
    scoreValue[1].textContent = computerScore;
}

// Winner message
function showWinner(message, className) {
    winnerMessage.textContent = message;
    winnerMessage.className = `winner-message ${className}`;
    winnerMessage.style.display = 'block';

    const cleanup = () => {
        winnerMessage.style.display = 'none';
        winnerMessage.className = 'winner-message';
        reset();
    };

    
    winnerMessage.removeEventListener('animationend', cleanup);
    winnerMessage.addEventListener('animationend', () => {
        setTimeout(cleanup, 1000);
    }, { once: true });
}


function checkWinner() {
    if (playerScore >= WIN_SCORE || computerScore >= WIN_SCORE) {
        resetGame = true;
        if (playerScore > computerScore) {
            showWinner('You Win! 🎉', 'player-win');
        } else if (computerScore > playerScore) {
            showWinner('Computer Wins! 😢', 'computer-win');
        } else {
            showWinner('Tie Game! 🔄', 'tie');
        }
    }
}

// Reset Game 
function reset() {
    playerScore = 0;
    computerScore = 0;
    resetGame = false;
    scoreValue[0].textContent = playerScore;
    scoreValue[1].textContent = computerScore;
}

// Game
function startGame(datasetOption) {
    if (resetGame) return;

    const playerChoice = datasetOption;
    const computerChoice = getComputerChoice();

    displayChoices(playerChoice, computerChoice);
    score(playerChoice, computerChoice);
    checkWinner();
}

// Start game on click
options.forEach(option => {
    option.addEventListener('click', () => {
        startGame(option.dataset.choice);
    });
});