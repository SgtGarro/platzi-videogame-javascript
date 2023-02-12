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

const playerPosition = {
  x: undefined,
  y: undefined,
};

const drawPlayer = function () {
  game.fillText(
    emojis["PLAYER"],
    playerPosition.x * elementsSize,
    playerPosition.y * elementsSize
  );
};

const drawMap = function (mapRowsCols) {
  mapRowsCols.forEach((row, y) =>
    row.forEach((col, x) => {
      if (col === "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = x;
        playerPosition.y = y;
      }
      game.fillText(emojis[col], x * elementsSize, y * elementsSize);
    })
  );
};

const startGame = function () {
  game.font = `${elementsSize}px Verdana`;
  game.textBaseline = "top";

  /**
   * @type {string[]}
   */
  const level = 0;
  const mapRows = maps[level].trim().replaceAll(" ", "").split("\n");
  const mapRowsCols = mapRows.map((row) => row.split(""));

  // Clear
  game.clearRect(0, 0, canvasSize, canvasSize);

  // Draw
  drawMap(mapRowsCols);
  drawPlayer();
};

const setCanvasSize = function () {
  canvasSize = Math.min(window.innerHeight * 0.75, window.innerWidth * 0.75);

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  startGame();
};

setCanvasSize();

window.addEventListener("load", startGame);
window.addEventListener("resize", setCanvasSize);

// Movement of the player
const moveUp = function () {
  playerPosition.y--;
  startGame();
};
const moveDown = function () {
  playerPosition.y++;
  startGame();
};
const moveLeft = function () {
  playerPosition.x--;
  startGame();
};
const moveRight = function () {
  playerPosition.x++;
  startGame();
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
