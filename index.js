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
