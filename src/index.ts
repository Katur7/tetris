import './App.scss';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Make grid
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const BOX_SIZE = 40;
const GRID_GAP = 41;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;
for (let x = 0.5; x < WIDTH; x += GRID_GAP) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, HEIGHT);
  ctx.closePath();
  ctx.stroke();
}

for (let y = 0.5; y < HEIGHT; y += GRID_GAP) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(WIDTH, y);
  ctx.closePath();
  ctx.stroke();
}

drawTPiece(0, 0);
drawSquarePiece(3, 1);
drawIPiece(6, 1);
drawJPiece(1, 4);
drawLPiece(4, 4);
drawZPiece(1, 8);
drawNPiece(5, 8);

function getCoords(col: number, row: number) {
  const x = 1 + (col * (BOX_SIZE + 1));
  const y = 1 + (row * (BOX_SIZE + 1));
  return { x, y };
}

function drawSquare(col: number, row: number) {
  const { x, y } = getCoords(col, row);
  ctx.fillRect(x, y, BOX_SIZE, BOX_SIZE);
}

function drawSquarePiece(col: number, row: number) {
  ctx.fillStyle = 'red';
  drawSquare(col, row);
  drawSquare(col + 1, row);
  drawSquare(col, row + 1);
  drawSquare(col + 1, row + 1);
}

function drawTPiece(col: number, row: number) {
  ctx.fillStyle = 'green';
  drawSquare(col, row);
  drawSquare(col, row + 1);
  drawSquare(col, row + 2);
  drawSquare(col + 1, row + 1);
}

function drawIPiece(col: number, row: number) {
  ctx.fillStyle = 'yellow';
  drawSquare(col, row);
  drawSquare(col, row + 1);
  drawSquare(col, row + 2);
  drawSquare(col, row + 3);
}

function drawJPiece(col: number, row: number) {
  ctx.fillStyle = 'blue';
  drawSquare(col + 1, row);
  drawSquare(col + 1, row + 1);
  drawSquare(col + 1, row + 2);
  drawSquare(col, row + 2);
}

function drawLPiece(col: number, row: number) {
  ctx.fillStyle = 'orange';
  drawSquare(col, row);
  drawSquare(col, row + 1);
  drawSquare(col, row + 2);
  drawSquare(col + 1, row + 2);
}

function drawZPiece(col: number, row: number) {
  ctx.fillStyle = 'lightblue';
  drawSquare(col, row + 1);
  drawSquare(col + 1, row + 1);
  drawSquare(col + 1, row);
  drawSquare(col + 2, row);
}

function drawNPiece(col: number, row: number) {
  ctx.fillStyle = 'pink';
  drawSquare(col, row + 2);
  drawSquare(col, row + 1);
  drawSquare(col + 1, row + 1);
  drawSquare(col + 1, row);
}
