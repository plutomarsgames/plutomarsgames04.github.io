const board = document.getElementById("board");
const diceText = document.getElementById("dice");
const turnText = document.getElementById("turn");

let currentPlayer = "Red";
let positions = {
  Red: 0,
  Blue: 0
};

// create board
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = "Dice: " + dice;

  positions[currentPlayer] += dice;

  if (positions[currentPlayer] >= 99) {
    alert(currentPlayer + " Wins!");
    location.reload();
  }

  updateBoard();
  switchPlayer();
}

function updateBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.innerHTML = "");

  for (let player in positions) {
    let pos = positions[player];
    if (pos < 100) {
      cells[pos].innerHTML += `<div class="${player.toLowerCase()}" style="width:15px;height:15px;border-radius:50%;margin:auto;"></div>`;
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "Red" ? "Blue" : "Red";
  turnText.innerText = "Turn: " + currentPlayer;
}
