const board = document.getElementById("board");
const diceText = document.getElementById("dice");
const turnText = document.getElementById("turn");

let currentPlayer = "red";

// Ludo path (fixed path)
const path = [
  0,1,2,3,4,5,6,7,8,9,
  19,29,39,49,59,69,79,89,99,
  98,97,96,95,94,93,92,91,90,
  80,70,60,50,40,30,20,10
];

let positions = {
  red: -1,
  blue: -1
};

// create board
for (let i = 0; i < 100; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}

// highlight path
function highlightPath() {
  let cells = document.querySelectorAll(".cell");
  path.forEach(i => {
    cells[i].style.background = "#334155";
  });
}
highlightPath();

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = "Dice: " + dice;

  movePlayer(dice);
}

function movePlayer(dice) {
  if (positions[currentPlayer] === -1) {
    if (dice === 6) {
      positions[currentPlayer] = 0;
    }
  } else {
    positions[currentPlayer] += dice;

    if (positions[currentPlayer] >= path.length) {
      alert(currentPlayer.toUpperCase() + " Wins!");
      location.reload();
    }
  }

  updateBoard();
  switchPlayer();
}

function updateBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.innerHTML = "");

  for (let player in positions) {
    let posIndex = positions[player];
    if (posIndex >= 0 && posIndex < path.length) {
      let cellIndex = path[posIndex];
      cells[cellIndex].innerHTML += `
        <div style="
          width:18px;
          height:18px;
          border-radius:50%;
          margin:auto;
          background:${player};
        "></div>
      `;
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "red" ? "blue" : "red";
  turnText.innerText = "Turn: " + currentPlayer.toUpperCase();
}
