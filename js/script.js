var gamemap = document.getElementById("gamemap");
var playerX = 10;
var playerY = 9;
var goalAmount = 0;
var levels = [tileMap01, tileMap02, tileMap03];
var level = 0;
var temp = "E";
var map;
var map = levels[level].mapGrid;

function buildMap(currentLevel) {
  var map = levels[currentLevel].mapGrid;
  for (y = 0; y < map.length; y++) {
    for (x = 0; x < map[y].length; x++) {
      let element = document.createElement("div");
      gamemap.appendChild(element).className = map[y][x];
      gamemap.appendChild(element).id = `${y},${x}`;
    }
  }
}

buildMap(level);

/*function readKey(event) {
  switch (event.key) {
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

document.addEventListener("keydown", readKey);

function move(y, x) {
  document.getElementById(`${playerY},${playerX}`).className = temp;
  playerX += x;
  playerY += y;
  temp = document.getElementById(`${playerY},${playerX}`).className;
  document.getElementById(`${playerY},${playerX}`).className = "P";
  checkIfWin();
}

function getGoal() {
  return document.getElementsByClassName("G").length;
}
goalAmount = getGoal(document);

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

function checkBox(posY, posX, y, x) {
  var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
  if (positionCheck.className == "E") {
    moveBox(posY, posX, y, x, "E", "B");
  } else if (positionCheck.className == "G") {
    moveBox(posY, posX, y, x, "E", "BG");
  }
}

function checkBoxOnGoal(posY, posX, y, x) {
  var positionCheck = document.getElementById(`${posY + y},${posX + x}`);
  if (positionCheck.className == "E") {
    moveBox(posY, posX, y, x, "G", "B");
  } else if (positionCheck.className == "G") {
    moveBox(posY, posX, y, x, "G", "BG");
  }
}

function checkIfWin() {
  if (goalAmount == document.getElementsByClassName("BG").length) {
    if (level < levels.length - 1) {
      setTimeout(function () {
        level++;
        gamemap.innerHTML = "";
        buildMap(level);
      }, 100);
    } else {
      setTimeout(function () {
        alert("Du vann");
        gamemap.innerHTML = "Ctrl + R om du vill börja om";
      }, 100);
    }
  }
}

function moveBox(posY, posX, y, x, current, movePos) {
  document.getElementById(`${posY},${posX}`).className = current;
  posX += x;
  posY += y;
  document.getElementById(`${posY},${posX}`).className = movePos;
  move(y, x);
}
*/

/*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  */
