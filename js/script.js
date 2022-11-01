var board = document.getElementById("board");
var playerX = 0;
var playerY = 0;
var goalAmount = 0;
var levels = [tileMap01, tileMap02, tileMap03];
var level = 0;
var temp = "E";

function readKey(e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      tryMove(0, 1);
      break;

    case "ArrowLeft":
      tryMove(0, -1);
      break;

    case "ArrowDown":
      tryMove(1, 0);
      break;

    case "ArrowUp":
      tryMove(-1, 0);
      break;
  }
}

document.addEventListener("keydown", readKey, false);

function drawBoard(currentLevel) {
  var map = levels[currentLevel].mapGrid;
  map.forEach((row, i) => {
    row.forEach((value, j) => {
      let element = document.createElement("div");
      if (value == " ") {
        board.appendChild(element).className = "E";
      } else if (value == "P") {
        playerY = i;
        playerX = j;
        board.appendChild(element).className = value;
      } else {
        board.appendChild(element).className = value;
      }
      board.appendChild(element).id = `${i},${j}`;
    });
  });
  goalAmount = document.getElementsByClassName("G").length;
}

function nextLevel() {
  level++;
  board.innerHTML = "";
  drawBoard(level);
}

function finishGame() {
  alert("You have completed the Game!");
  board.innerHTML = "Refersh the page to start again";
}

function checkWinning() {
  if (goalAmount == document.getElementsByClassName("BG").length) {
    alert(`You finished level ${level}!`);
    if (level < levels.length - 1) {
      setTimeout(nextLevel, 100);
    } else {
      setTimeout(finsihGame, 100);
    }
  }
}

function move(y, x) {
  document.getElementById(`${playerY},${playerX}`).className = temp;
  playerX += x;
  playerY += y;
  temp = document.getElementById(`${playerY},${playerX}`).className;
  document.getElementById(`${playerY},${playerX}`).className = "P";
  checkWinning();
}

function moveBox(posY, posX, y, x, current, movePos) {
  document.getElementById(`${posY},${posX}`).className = current;
  posX += x;
  posY += y;
  document.getElementById(`${posY},${posX}`).className = movePos;
  move(y, x);
}

function checkBoxOnGoal(posY, posX, y, x) {
  var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
  if (positionCheck.className == "E") {
    moveBox(posY, posX, y, x, "G", "B");
  } else if (positionCheck.className == "G") {
    moveBox(posY, posX, y, x, "G", "BG");
  }
}

function checkBox(posY, posX, y, x) {
  var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
  if (positionCheck.className == "E") {
    moveBox(posY, posX, y, x, "E", "B");
  } else if (positionCheck.className == "G") {
    moveBox(posY, posX, y, x, "E", "BG");
  }
}

function tryMove(y, x) {
  var positionCheck = document.getElementById(`${playerY + y},${playerX + x}`);
  if (positionCheck.className == "E") {
    move(y, x);
  } else if (positionCheck.className == "B") {
    checkBox(playerY + y, playerX + x, y, x);
  } else if (positionCheck.className == "BG") {
    checkBoxOnGoal(playerY + y, playerX + x, y, x);
  } else if (positionCheck.className == "G") {
    move(y, x);
  }
}

drawBoard(level);
