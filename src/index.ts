import './App.scss';
import { Game } from './game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx === null) {
  throw new Error('Canvas not found');
}

const game = new Game(ctx);
game.start();

// drawJPiece(1, 4);
// drawLPiece(4, 4);
// drawZPiece(1, 8);
// drawNPiece(5, 8);

// function drawJPiece(col: number, row: number) {
//   ctx.fillStyle = 'blue';
//   drawSquare(col + 1, row);
//   drawSquare(col + 1, row + 1);
//   drawSquare(col + 1, row + 2);
//   drawSquare(col, row + 2);
// }

// function drawLPiece(col: number, row: number) {
//   ctx.fillStyle = 'orange';
//   drawSquare(col, row);
//   drawSquare(col, row + 1);
//   drawSquare(col, row + 2);
//   drawSquare(col + 1, row + 2);
// }

// function drawZPiece(col: number, row: number) {
//   ctx.fillStyle = 'lightblue';
//   drawSquare(col, row + 1);
//   drawSquare(col + 1, row + 1);
//   drawSquare(col + 1, row);
//   drawSquare(col + 2, row);
// }

// function drawNPiece(col: number, row: number) {
//   ctx.fillStyle = 'pink';
//   drawSquare(col, row + 2);
//   drawSquare(col, row + 1);
//   drawSquare(col + 1, row + 1);
//   drawSquare(col + 1, row);
// }
