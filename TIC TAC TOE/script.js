// script.js

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(event) {
    const cellIndex = event.target.id;

    if (board[cellIndex] === "" && !isGameOver) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            showResult(`${board[a]} wins!`);
            return;
        }
    }

    if (!board.includes("")) {
        isGameOver = true;
        showResult("It's a draw!");
    }
}

function updateStatus() {
    if (!isGameOver) {
        statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}

function showResult(message) {
    resultMessage.textContent = message;
    resultScreen.classList.add("show");
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameOver = false;
    cells.forEach(cell => (cell.textContent = ""));
    statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    resultScreen.classList.remove("show");
}

function newGame() {
    resetGame();
    resultScreen.classList.remove("show");
}

