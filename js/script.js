var gamemap = document.getElementById("gamemap");
var playerX = 10;
var playerY = 9;
var goalAmount = 0;
var levels = [tileMap01, tileMap02, tileMap03];
var level = 0;
var temp = "E";
var map;

function board(currentLevel) {
  const input_map = levels[currentLevel].mapGrid;
  let board_struct = new Array();
  input_map.forEach((row, y) => {
    row.forEach((value, x) => {
      switch (value[0]) {
        case " ":
          board_struct.push([x, y, "E", "E"]);
          break;
        case "W":
          board_struct.push([x, y, "W", "W"]);
          break;
        case "G":
          board_struct.push([x, y, "G", "G"]);
          break;
        default:
          board_struct.push([x, y, "E", value[0]]);
          break;
      }
    });
  });
  return board_struct;
}

function drawBoard(board) {
  document.getElementById("gamemap").remove();
  let gamemap = document.createElement("div");
  document.body.appendChild(gamemap).id = "gamemap";
  board.forEach((item) => {
    let element = document.createElement("div");
    gamemap.appendChild(element).id = `${item[0]},${item[1]}`;
    gamemap.appendChild(element).className = `${item[2]}${item[3]}`;
  });
}

var game_state = board(0);
drawBoard(game_state);

function readKey(event) {
  switch (event.key) {
    case "ArrowRight":
      var nnmap = board(1);
      drawBoard(nnmap);
      tryMove(0, 1);
      break;
    case "ArrowLeft":
      var nmap = board(0);
      drawBoard(nmap);
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

function getPlayerCoords(board) {
    let player;
  board.forEach((item) => {
      if (item[3] == "P") {
	  player = item;}
  });
    return player;
}

console.log(getPlayerCoords(game_state));

function moveH(map, x) {
  let playerCoord = getPlayerCoords(map);
  console.log(typeof playerCoord[0]);
}

moveH(game_state);

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
