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
