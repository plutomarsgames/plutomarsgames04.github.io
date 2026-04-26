const board = document.getElementById("board");
const diceText = document.getElementById("dice");
const turnText = document.getElementById("turn");
const rollBtn = document.getElementById("rollBtn");

let currentPlayer = "red";

// PATH
const path = [
  0,1,2,3,4,5,6,7,8,9,
  19,29,39,49,59,69,79,89,99,
  98,97,96,95,94,93,92,91,90,
  80,70,60,50,40,30,20,10
];

// TOKENS
let players = {
  red: [-1, -1],
  blue: [-1, -1]
};

// CREATE BOARD
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}

// 🔥 HIGHLIGHT PATH (FIXED)
function highlightPath() {
  let cells = document.querySelectorAll(".cell");
  path.forEach(i => {
    cells[i].classList.add("path");
  });
}
highlightPath();

rollBtn.addEventListener("click", rollDice);

// 🎲 ROLL
function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = "Dice: " + dice;

  movePlayer(dice);
}

// MOVE
function movePlayer(dice) {
  let tokens = players[currentPlayer];
  let moved = false;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === -1 && dice === 6) {
      tokens[i] = 0;
      moved = true;
      break;
    } else if (tokens[i] >= 0) {
      tokens[i] += dice;

      if (tokens[i] >= path.length) {
        alert(currentPlayer.toUpperCase() + " WINS!");
        location.reload();
      }

      moved = true;
      break;
    }
  }

  if (moved) {
    checkKill();
    updateBoard();
  }

  switchPlayer();
}

// 💥 KILL SYSTEM
function checkKill() {
  let opponent = currentPlayer === "red" ? "blue" : "red";

  players[currentPlayer].forEach(pos => {
    players[opponent].forEach((opPos, j) => {
      if (pos === opPos && pos !== -1) {
        players[opponent][j] = -1;
      }
    });
  });
}

// 🎨 UPDATE BOARD (FIXED VISUAL)
function updateBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.innerHTML = "");

  for (let player in players) {
    players[player].forEach(posIndex => {
      if (posIndex >= 0 && posIndex < path.length) {
        let cellIndex = path[posIndex];
        let token = document.createElement("div");
        token.classList.add("token", player);
        cells[cellIndex].appendChild(token);
      }
    });
  }
}

// 🔄 SWITCH
function switchPlayer() {
  currentPlayer = currentPlayer === "red" ? "blue" : "red";
  turnText.innerText = "Turn: " + currentPlayer.toUpperCase();
}
