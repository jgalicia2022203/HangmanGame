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
