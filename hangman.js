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
		buttonsContainer.appendChild(button);

		button.addEventListener('click', () => handleLetterClick(letter));
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
        endGame(false);
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

}




function initializeGame() {

    generateLetterButtons();

    restartGame();

}




restartButton.addEventListener('click', restartGame);




initializeGame();
