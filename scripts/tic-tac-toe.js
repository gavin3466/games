const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");
const restartBtn = document.getElementById("restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameStatus.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return true;
        }
    }
    if (!board.includes("")) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
    }
    return false;
}

function handleCellClick(index) {
    if (!gameActive || board[index]) return;
    board[index] = currentPlayer;
    renderBoard();
    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function renderBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => handleCellClick(index));
        gameBoard.appendChild(cellDiv);
    });
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

gameBoard.style.display = "grid";
gameBoard.style.gridTemplateColumns = "repeat(3, 100px)";
gameBoard.style.gridGap = "5px";
renderBoard();
restartBtn.addEventListener("click", restartGame);
restartGame();
