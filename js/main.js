"use strict";
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

let canvasSize, elementsSize;

let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

const enemiesPositions = [];

const playerWin = function () {
  level++;
  playerPosition.x = playerPosition.y = undefined;
  giftPosition.x = giftPosition.y = undefined;
  enemiesPositions.splice(0);
};

const playerFail = function () {
  lives--;
  if (lives === 0) {
    level = 0;
    lives = 3;
  }
  playerPosition.x = playerPosition.y = undefined;
  giftPosition.x = giftPosition.y = undefined;
};

const drawPlayer = function (updateGame) {
  const giftCollision =
    playerPosition.x === giftPosition.x && playerPosition.y === giftPosition.y;

  if (giftCollision) {
    playerWin();
    updateGame();
  }

  const enemyCollision = enemiesPositions.find((enemy) => {
    return enemy.x === playerPosition.x && enemy.y === playerPosition.y;
  });

  if (enemyCollision) {
    playerFail();
    updateGame();
  }

  game.fillText(
    emojis["PLAYER"],
    playerPosition.x * elementsSize,
    playerPosition.y * elementsSize
  );
};
const drawMap = function (mapRowsCols) {
  mapRowsCols.forEach((row, y) =>
    row.forEach((col, x) => {
      if (col === "O" && playerPosition.x === undefined) {
        playerPosition.x = x;
        playerPosition.y = y;
      } else if (col === "I" && giftPosition.x === undefined) {
        giftPosition.x = x;
        giftPosition.y = y;
      } else if (col === "X") enemiesPositions.push({ x, y });

      game.fillText(emojis[col], x * elementsSize, y * elementsSize);
    })
  );
};

const gameWin = function () {
  console.log("You win");
};

const updateGame = function () {
  game.font = `${elementsSize}px Verdana`;
  game.textBaseline = "top";

  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }
  const mapRows = map.trim().replaceAll(" ", "").split("\n");
  const mapRowsCols = mapRows.map((row) => row.split(""));

  // Clear
  game.clearRect(0, 0, canvasSize, canvasSize);

  enemiesPositions.splice(0);
  // Draw
  drawMap(mapRowsCols);
  drawPlayer(updateGame);
};

const setCanvasSize = function () {
  canvasSize = Math.min(window.innerHeight * 0.75, window.innerWidth * 0.75);

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  updateGame();
};
setCanvasSize();

window.addEventListener("load", updateGame);
window.addEventListener("resize", setCanvasSize);

// Movement of the player
const moveUp = function () {
  if (playerPosition.y - 1 >= 0) playerPosition.y--;
  updateGame();
};
const moveDown = function () {
  if (playerPosition.y + 1 <= 9) playerPosition.y++;
  updateGame();
};
const moveLeft = function () {
  if (playerPosition.x - 1 >= 0) playerPosition.x--;
  updateGame();
};
const moveRight = function () {
  if (playerPosition.x + 1 <= 9) playerPosition.x++;
  updateGame();
};

window.addEventListener("keydown", function (e) {
  const key = e.key.toLowerCase();
  switch (key) {
    case "w":
    case "arrowup":
      moveUp();
      break;
    case "a":
    case "arrowleft":
      moveLeft();
      break;
    case "s":
    case "arrowdown":
      moveDown();
      break;
    case "d":
    case "arrowright":
      moveRight();
      break;
  }
});

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

console.log(playerPosition);
