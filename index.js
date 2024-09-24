const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }

  function resetBoard() {
    board.fill("");
  }

  function placeMark(index, mark) {
    if (index <= 8 && index >= 0) {
      if (board[index] === "") {
        board[index] = mark;
        return true;
      } else {
        console.log("This spot is already being used!");
        return false;
      }
    } else {
      return false;
    }
  }
  return {
    gameboardStatus: getBoard,
    resetBoard,
    placeMark,
  };
})();

function Player(name, mark) {
  const player = {
    name: name,
    mark: mark,
  };
  return player;
}
const playerOne = Player("Player X", "X");
const playerTwo = Player("Player O", "O");

function Game() {
  initializeGame();
  let scoreX = 0;
  let scoreO = 0;
  let currentRound = 1;
  let currentPlayer = playerOne;
  let gameStatus = active;

  function initializeGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (Gameboard.placeMark(index, currentPlayer.mark)) {
          cell.textContent = currentPlayer.mark;
          const resultMessage = endGame();
          if (resultMessage) {
            resultMessage;
            resetGame();
          }
          switchPlayer();
        }
      });
    });
  }

  function switchPlayer() {
    if (currentPlayer === playerOne) {
      currentPlayer = playerTwo;
      return;
    } else if (currentPlayer === playerTwo) {
      currentPlayer = playerOne;
      return;
    }
  }
  function checkWinner(X, O) {
    for (let i = 0; i < winningCombinations.length; i++) {
      const combination = winningCombinations[i];
      const value1 = board[combination[0]];
      const value2 = board[combination[1]];
      const value3 = board[combination[2]];
      if (value1 === value2 && value2 === value3 && value1 !== "") {
        return value1;
      }
    }
    return null;
  }

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function endGame(winner, draw) {
    const winnerTextElement = document.querySelector(".winner-text");
    let result = checkWinner();
    if (result === "X") {
      winnerTextElement.textContent = "Player X wins!!";
      resetGame();
    } else if (result === "O") {
      winnerTextElement.textContent = "Player O wins!!";
      resetGame();
    } else if (result === null) {
      winnerTextElement.textContent = "It's a draw!";
      resetGame();
    }
  }
  function resetGame() {
    gameboard.resetBoard();
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayer = playerOne;
    const roundElement = document.querySelector(".round");
    roundElement.textContent = `Round: ${currentRound}`;
    const winnerTextElement = document.querySelector(".winner-text");
    winnerTextElement.textContent = "";
  }
}
// if (value1 === "X") { scoreX++; document.querySelector(".player-X").textContent = scoreX;
// } else {scoreO++; document.querySelector(".player-O").textContent = scoreO;
