const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }
  return {
    gameboardStatus: getBoard,
  };

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
  let scoreX = 0;
  let scoreO = 0;
  let currentRound = 1;
  let currentPlayer = playerOne;
  let gameStatus = active;

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
      if (value1 === "X") {
        scoreX++;
        document.querySelector(".player-X").textContent = scoreX;
      } else {
        scoreO++;
        document.querySelector(".player-O").textContent = scoreO;
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
}
