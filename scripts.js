// scripts.js

//Start game Button event listener
document.getElementById("start-game").addEventListener("click", startGame);

//function to startGame
function startGame() {
  const gridSize = parseInt(document.getElementById("grid-size").value);
  const winStreak = parseInt(document.getElementById("win-streak").value);
  createBoard(gridSize);
  initializeGame(gridSize, winStreak);
}

// function for board creation which takes input of board size
function createBoard(size) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  gameBoard.style.gridTemplateRows = `repeat(${size}, 50px)`;
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

let currentPlayer = "X";
let board;
let gridSize;
let winStreak;

//function to initialize the game
function initializeGame(size, streak) {
  gridSize = size;
  winStreak = streak;
  board = Array(size * size).fill(null);
  currentPlayer = "X";
  document.getElementById("result").innerText = "";
}

//function to handle the cell click(to mark the entry 'X' or 'O')
function handleCellClick(event) {
  const index = event.target.dataset.index;
  if (!board[index]) {
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWin()) {
      document.getElementById("result").innerText = `${currentPlayer} Wins!`;
      disableBoard();
    } else if (board.every((cell) => cell)) {
      document.getElementById("result").innerText = "Draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
}
//to check the winer
function checkWin() {
  const lines = generateWinningLines(gridSize, winStreak);
  return lines.some((line) =>
    line.every((index) => board[index] === currentPlayer)
  );
}

function generateWinningLines(size, streak) {
  const lines = [];

  // Horizontal and Vertical lines
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - streak; j++) {
      // Horizontal
      lines.push(Array.from({ length: streak }, (_, k) => i * size + j + k));
      // Vertical
      lines.push(
        Array.from({ length: streak }, (_, k) => j * size + i + k * size)
      );
    }
  }

  // Diagonal lines
  for (let i = 0; i <= size - streak; i++) {
    for (let j = 0; j <= size - streak; j++) {
      // Diagonal \
      lines.push(
        Array.from({ length: streak }, (_, k) => (i + k) * size + j + k)
      );
      // Diagonal /
      lines.push(
        Array.from(
          { length: streak },
          (_, k) => (i + k) * size + j + streak - k - 1
        )
      );
    }
  }

  return lines;
}
