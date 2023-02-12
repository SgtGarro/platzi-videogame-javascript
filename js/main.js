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

const init = function () {
  game.font = `${elementsSize}px Verdana`;
  game.textBaseline = "top";

  /**
   * @type {string[]}
   */
  const level = 0;
  const mapRows = maps[level].trim().replaceAll(" ", "").split("\n");
  const mapRowsCols = mapRows.map((row) => row.split(""));

  mapRowsCols.forEach((row, y) =>
    row.forEach((col, x) => {
      game.fillText(emojis[col], x * elementsSize, y * elementsSize);
    })
  );
};

const setCanvasSize = function () {
  canvasSize = Math.min(window.innerHeight * 0.75, window.innerWidth * 0.75);

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10 - 1;

  init();
};

setCanvasSize();

window.addEventListener("load", init);
window.addEventListener("resize", setCanvasSize);

// Movement of the player
const moveUp = function () {
  console.log("Going up");
};
const moveDown = function () {
  console.log("Going down");
};
const moveLeft = function () {
  console.log("Going left");
};
const moveRight = function () {
  console.log("Going right");
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
