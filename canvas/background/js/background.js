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

class Figure {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = getRandom(0.1, 0.6);
    this.outline = 5 * this.size;
    this.motion = timeFunctions[randomInteger(0, timeFunctions.length - 1)];
  }
}

class Circle extends Figure {
  constructor(x, y) {
    super(x, y);
    this.radius = 12 * this.size;
  }
}

class Cross extends Figure {
  constructor(x, y) {
    super(x, y);
    this.side = 20 * this.size;
    this.angle = getRandom(0, 360);
    this.rotationSpeed = getRandom(-0.2, 0.2);
  }
}

function createFigures(amountFrom, amountTo) {
  for (let i = 0; i < randomInteger(amountFrom, amountTo); i++) {
    figures.push(
      new Cross(randomInteger(0, canvas.width), randomInteger(0, canvas.height))
    );
  }

  for (let i = 0; i < randomInteger(amountFrom, amountTo); i++) {
    figures.push(
      new Circle(randomInteger(0, canvas.width), randomInteger(0, canvas.height))
    );
  }
}

function drawCross(cross) {
  const rad = cross.angle * Math.PI / 180;
  const halfSide = cross.side / 2;
  let {x, y} = cross.motion(cross.x, cross.y, Date.now());

  canvasContext.translate(x, y);
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
  canvasContext.translate(-x, -y);

  cross.angle += cross.rotationSpeed;
}

function drawCircle(circle) {
  let {x, y} = circle.motion(circle.x, circle.y, Date.now());

  canvasContext.lineWidth = circle.outline;
  canvasContext.strokeStyle = '#ffffff';
  canvasContext.beginPath();
  canvasContext.arc(x, y, circle.radius, 0, 2*Math.PI, false);
  canvasContext.stroke();
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInteger(min, max) {
  return Math.round(getRandom(min, max));
}

function tick() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  figures.forEach(figure => {
    if (figure instanceof Cross) {
      drawCross(figure);

    } else {
      drawCircle(figure);
    }
  });
}

createFigures(80, 150);
setInterval(tick, 50);