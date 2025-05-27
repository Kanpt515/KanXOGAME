// script.js
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const playerScoreEl = document.getElementById('player-score');
const aiScoreEl = document.getElementById('ai-score');

let board = Array(9).fill(null);
let playerTurn = true;
let playerScore = 0;
let aiScore = 0;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function renderBoard() {
  cells.forEach((cell, idx) => {
    cell.textContent = board[idx];
  });
}

function checkWinner(b, player) {
  return winCombos.some(combo => combo.every(i => b[i] === player));
}

function emptyCells() {
  return board.map((val, i) => val === null ? i : null).filter(v => v !== null);
}

function aiMove() {
  const empty = emptyCells();
  if (empty.length === 0) return;
  const move = empty[Math.floor(Math.random() * empty.length)];
  board[move] = 'O';
  renderBoard();
  if (checkWinner(board, 'O')) {
    aiScore++;
    updateScores();
    setTimeout(() => alert("Computer wins!"), 200);
    resetBoard();
  } else if (emptyCells().length === 0) {
    setTimeout(() => alert("Draw!"), 200);
    resetBoard();
  } else {
    playerTurn = true;
  }
}

function handleClick(e) {
  const idx = +e.target.dataset.index;
  if (!playerTurn || board[idx]) return;

  board[idx] = 'X';
  renderBoard();

  if (checkWinner(board, 'X')) {
    playerScore++;
    updateScores();
    setTimeout(() => alert("You win!"), 200);
    resetBoard();
  } else if (emptyCells().length === 0) {
    setTimeout(() => alert("Draw!"), 200);
    resetBoard();
  } else {
    playerTurn = false;
    setTimeout(aiMove, 500); // simulate thinking time
  }
}

function updateScores() {
  playerScoreEl.textContent = playerScore;
  aiScoreEl.textContent = aiScore;
}

function resetBoard() {
  board = Array(9).fill(null);
  renderBoard();
  playerTurn = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', resetBoard);

renderBoard(); // initial
