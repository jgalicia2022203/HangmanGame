const words = [
	'programming',
	'javascript',
	'development',
	'guatemala',
	'computer',
	'technology',
	'application',
	'learning',
	'project',
	'student',
	'code',
	'web',
	'game',
	'programmer',
	'application',
	'feedback',
	'career',
	'challenge',
	'solution',
	'algorithm',
	'function',
	'bug',
	'team',
	'innovation',
	'framework',
];

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const buttonsContainer = document.getElementById('buttons-container');
const usedLettersContainer = document.getElementById('used-letters');
const attemptsRemainingContainer =
	document.getElementById('attempts-remaining');
const wordContainer = document.getElementById('word-container');
const restartButton = document.getElementById('restart-button');
const usedLetters = [];
const maxAttempts = 7;
const span = document.createElement('span');
const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

span.textContent = 'RESTART';
let attemptsRemaining = maxAttempts;
let selectedWord = selectRandomWord(words);
let gameInProgress = false;

function selectRandomWord(words) {
	const filteredWords = words.filter((word) => word.length <= 15);

	if (filteredWords.length === 0) {
		// No words match the filter criteria
		return '';
	}

	const randomIndex = Math.floor(Math.random() * filteredWords.length);
	return filteredWords[randomIndex];
}

function generateLetterButtons() {
	for (let letter of alphabet) {
		const button = document.createElement('button');
		button.textContent = letter;
		button.className = 'btnletter';
		buttonsContainer.appendChild(button);

		button.addEventListener('click', () => handleLetterClick(letter));

		restartButton.className = 'buttonrestart';
		restartButton.innerHTML =
			'<span class="buttonrestartspan">' + 'RESTART' + '</span>';
	}
}

function handleLetterClick(letter) {
	if (!gameInProgress) {
		return;
	}

	if (usedLetters.includes(letter)) {
		return;
	}

	usedLetters.push(letter);
	updateUsedLetters();

	if (selectedWord.includes(letter)) {
		updateWordDisplay();
	} else {
		attemptsRemaining--;
		updateAttemptsRemaining();
	}

	checkGameStatus();

	if (!wordContainer.textContent.includes('_')) {
		endGame(true);
	}

	if (
		!wordContainer.textContent.includes('_') &&
		usedLetters.length < selectedWord.length
	) {
		endGame(true);
	}
}

function updateUsedLetters() {
	usedLettersContainer.textContent = `Used letters: ${usedLetters.join(', ')}`;
}

function updateAttemptsRemaining() {
	attemptsRemainingContainer.textContent = `Attempts remaining: ${attemptsRemaining}`;
}

function updateWordDisplay() {
	wordContainer.textContent = selectedWord
		.split('')
		.map((letter) => (usedLetters.includes(letter) ? letter : '_'))
		.join(' ');
}

function checkGameStatus() {
	if (attemptsRemaining === 0) {
		drawHangman(ctx);
		endGame(false);
	} else {
		drawHangman(ctx);
	}
}

function enableLetterButtons() {
	buttonsContainer.querySelectorAll('button').forEach((button) => {
		button.disabled = false;
	});
}

function endGame(playerWon) {
	if (playerWon) {
		wordContainer.textContent = 'Congratulations, you won!';
	} else {
		wordContainer.textContent = `Game over! The correct word was: ${selectedWord}`;
	}

	disableLetterButtons();

	restartButton.disabled = true;

	gameInProgress = false;
}

function restartGame() {
	usedLetters.length = 0;

	attemptsRemaining = maxAttempts;

	selectedWord = selectRandomWord(words);

	updateUsedLetters();

	updateAttemptsRemaining();

	updateWordDisplay();

	wordContainer.textContent = '';

	enableLetterButtons();

	gameInProgress = true;

	Hangman();
}

function initializeGame() {
	generateLetterButtons();
	restartGame();
	updateWordDisplay();
}

restartButton.addEventListener('click', restartGame);

document.addEventListener('DOMContentLoaded', () => {
	initializeGame();
});

function drawHangman(ctx) {
	// Limpia el canvas antes de redibujar
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Dibuja el poste vertical
	ctx.moveTo(20, 400);
	ctx.lineTo(20, 20);

	// Dibuja el travesaño superior
	ctx.moveTo(20, 20);
	ctx.lineTo(250, 20);

	// Establece el estilo del trazo
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 5;

	ctx.stroke();

	// Dibuja  la cuerda
	if (attemptsRemaining < 7) {
		ctx.beginPath();
		ctx.moveTo(250, 20);
		ctx.lineTo(250, 50);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 5;
		ctx.stroke();

		// Dibuja la cabeza
		if (attemptsRemaining < 6) {
			ctx.beginPath();
			ctx.arc(250, 100, 50, 0, Math.PI * 2, false);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 5;
			ctx.stroke();
			// Dibuja el torso
			if (attemptsRemaining < 5) {
				ctx.beginPath();
				ctx.moveTo(250, 300);
				ctx.lineTo(250, 150);
				ctx.strokeStyle = 'black';
				ctx.lineWidth = 5;
				ctx.stroke();

				// Dibuja el brazo izquierdo
				if (attemptsRemaining < 4) {
					ctx.beginPath();
					ctx.moveTo(250, 200);
					ctx.lineTo(180, 150);
					ctx.strokeStyle = 'black';
					ctx.lineWidth = 5;
					ctx.stroke();

					// Dibuja el brazo derecho
					if (attemptsRemaining < 3) {
						ctx.beginPath();
						ctx.moveTo(250, 200);
						ctx.lineTo(325, 150);
						ctx.strokeStyle = 'black';
						ctx.lineWidth = 5;
						ctx.stroke();

						// Dibuja la pierna derecha
						if (attemptsRemaining < 2) {
							ctx.beginPath();
							ctx.moveTo(250, 300);
							ctx.lineTo(350, 375);
							ctx.strokeStyle = 'black';
							ctx.lineWidth = 5;
							ctx.stroke();

							// Dibuja la pierna izquierda
							if (attemptsRemaining < 1) {
								ctx.beginPath();
								ctx.moveTo(170, 375);
								ctx.lineTo(250, 300);
								ctx.strokeStyle = 'black';
								ctx.lineWidth = 5;
								ctx.stroke();
							}
						}
					}
				}
			}
		}
	}
}

// Función para dibujar la estaca del ahorcado
function Hangman() {
	// Comienza un nuevo trazo
	ctx.beginPath();

	// Dibuja el poste vertical
	ctx.moveTo(20, 400);
	ctx.lineTo(20, 20);

	// Dibuja el travesaño superior
	ctx.moveTo(20, 20);
	ctx.lineTo(250, 20);

	// Dibuja los trazos
	ctx.stroke();

	// Establece el estilo del trazo
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 5;

	// Dibuja los trazos
	ctx.stroke();
}

Hangman();
