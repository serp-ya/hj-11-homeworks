`use strict`;
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvasContext.canvas.clientWidth;
const canvasHeight = canvasContext.canvas.clientHeight;
const starColors = [
  '#ffffff',
  '#ffe9c4',
  '#d4fbff'
];

canvas.width = canvasWidth;
canvas.height = canvasHeight;

document.addEventListener('DOMContentLoaded', fillCanvasWithStars);
canvas.addEventListener('click', fillCanvasWithStars);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function fillCanvasWithStars() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < getRandom(200, 400); i++) {
    createStar();
  }
}

function createStar() {
  const size = getRandom(0, 1.1);
  const posX = Math.round(getRandom(0, canvasWidth));
  const posY = Math.round(getRandom(0, canvasHeight));
  const color = starColors[Math.round(getRandom(0, starColors.length - 1))];

  canvasContext.globalAlpha = getRandom(0.8, 1);
  canvasContext.fillStyle = color;
  canvasContext.fillRect(posX, posY, size, size);
}