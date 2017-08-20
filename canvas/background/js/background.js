`use strict`;
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const timeFunctions = [
  function (x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  function (x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];

let figures = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = getRandom(0.1, 0.6);
    this.outline = 5 * this.size;
    this.radius = 12 * this.size;
    this.motion = timeFunctions[Math.round(getRandom(0, 1))];
    this.vector = 1;
    this.speed = getRandom(1, 5);
  }
}

class Cross {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = getRandom(0.1, 0.6);
    this.side = 20 * this.size;
    this.outline = 5 * this.size;
    this.angle = Math.round(getRandom(0, 360));
    this.rotationSpeed = getRandom(-0.2, 0.2);
    this.motion = timeFunctions[Math.round(Math.random())];
    this.vector = 1;
    this.speed = getRandom(1, 5);
  }
}

function createFigures(amountFrom, amountTo) {
  for (let i = 0; i < getRandom(amountFrom, amountTo); i++) {
    figures.push(new Cross(Math.round(getRandom(0, canvas.width)), Math.round(getRandom(0, canvas.height))))
  }

  for (let i = 0; i < getRandom(amountFrom, amountTo); i++) {
    figures.push(new Circle(Math.round(getRandom(0, canvas.width)), Math.round(getRandom(0, canvas.height))))
  }
}

function drawCross(cross) {
  const rad = cross.angle * Math.PI / 180;
  const halfSide = cross.side / 2;
  let {x, y} = cross.motion(cross.x, cross.y, (Date.now() * cross.vector) * cross.speed);

  canvasContext.translate(cross.x, cross.y);
  canvasContext.rotate(rad);

  canvasContext.lineWidth = cross.outline;
  canvasContext.strokeStyle = '#ffffff';
  canvasContext.beginPath();
  canvasContext.moveTo(0 - halfSide, 0);
  canvasContext.lineTo(0 + halfSide, 0);
  canvasContext.stroke();

  canvasContext.beginPath();
  canvasContext.moveTo(0, 0 - halfSide);
  canvasContext.lineTo(0, 0 + halfSide);
  canvasContext.stroke();

  canvasContext.rotate(-rad);
  canvasContext.translate(-cross.x, -cross.y);

  if (x <= 0 || x >= canvas.width) {
    x = -x;
    cross.vector *= -1;
  }

  if (y <= 0 || y >= canvas.width) {
    y = -y;
    cross.vector *= -1;
  }

  [cross.x, cross.y] = [x, y];
  cross.angle += cross.rotationSpeed;
}

function drawCircle(circle) {
  let {x, y} = circle.motion(circle.x, circle.y, (Date.now() * circle.vector) * circle.speed);

  canvasContext.lineWidth = circle.outline;
  canvasContext.strokeStyle = '#ffffff';
  canvasContext.beginPath();
  canvasContext.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI, false);
  canvasContext.stroke();

  if (x <= 0 || x >= canvas.width) {
    x = -x;
    circle.vector *= -1;
  }

  if (y <= 0 || y >= canvas.width) {
    y = -y;
    circle.vector *= -1;
  }

  [circle.x, circle.y] = [x, y];
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function tick() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  figures.forEach(figure => {
    if (figure instanceof Cross) {
      drawCross(figure);

    } else {
      drawCircle(figure);
    }
  })
}

createFigures(80, 150);
setInterval(tick, 50);