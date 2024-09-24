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
  return { name, mark };
}

const playerOne = Player("Player X", "X");
const playerTwo = Player("Player O", "O");

function Game() {
  let currentPlayer = playerOne;
  let gameStatus = "active";

  let scoreX = 0;
  let scoreO = 0;
  let currentRound = 1;

  initializeGame();

  function initializeGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleClick(cell, index));
    });
    const roundElement = document.querySelector(".round");
    roundElement.textContent = `Round: ${currentRound}`;
  }

  function handleClick(cell, index) {
    const markPlaced = Gameboard.placeMark(index, currentPlayer.mark);
    if (gameStatus === "active" && markPlaced) {
      cell.textContent = currentPlayer.mark;
      if (checkWinner()) {
        gameStatus = "over";
      } else {
        switchPlayer();
      }
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
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

  function checkWinner() {
    const board = Gameboard.gameboardStatus();
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
        const winnerTextElement = document.querySelector(".winner-text");
        winnerTextElement.textContent = `${board[a]} wins this round!!`;

        if (board[a] === "X") {
          scoreX++;
        } else {
          scoreO++;
        }

        updateScores();
        setTimeout(() => resetGame(), 3000);
        return true;
      }
    }

    if (!board.includes("")) {
      const winnerTextElement = document.querySelector(".winner-text");
      winnerTextElement.textContent = "It's a draw!";
      setTimeout(() => resetGame(), 3000);
      return true;
    }

    return false;
  }

  function updateScores() {
    const playerXScoreElement = document.querySelector(".player-X");
    const playerOScoreElement = document.querySelector(".player-O");

    playerXScoreElement.textContent = `Player X: ${scoreX}`;
    playerOScoreElement.textContent = `Player O: ${scoreO}`;

    checkOverallWinner();
  }

  function checkOverallWinner() {
    if (scoreX === 3) {
      const winnerTextElement = document.querySelector(".winner-text");
      winnerTextElement.textContent = "Player X is the overall winner!";
      gameStatus = "over";
      setTimeout(() => {
        scoreX = 0;
        scoreO = 0;
        currentRound = 0;
        updateScores();
      }, 3000);
    } else if (scoreO === 3) {
      const winnerTextElement = document.querySelector(".winner-text");
      winnerTextElement.textContent = "Player O is the overall winner!";
      gameStatus = "over";

      setTimeout(() => {
        scoreX = 0;
        scoreO = 0;
        currentRound = 0;
        updateScores();
      }, 3000);
    }
  }

  function resetGame() {
    Gameboard.resetBoard();
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentRound++;

    currentPlayer = playerOne;
    gameStatus = "active";
    const winnerTextElement = document.querySelector(".winner-text");
    winnerTextElement.textContent = "";
    initializeGame();
  }
}
const ticTacToeGame = Game();
