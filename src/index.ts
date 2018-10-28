import './App.scss';
import { Game } from './game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx === null) {
  throw new Error('Canvas not found');
}
// Save state of canvas before all pieces
// So first save empty board
// Then animate the first piece until it's stuck
// Then save the board with the first piece
// Then animate the next one
// And so on...
// Or redraw instead of save/restore
// TODO: Make board a little bit smaller

const game = new Game(ctx);
game.start();

// drawTPiece(0, 0);
// drawSquarePiece(3, 1);
// drawJPiece(1, 4);
// drawLPiece(4, 4);
// drawZPiece(1, 8);
// drawNPiece(5, 8);

// function getCoords(col: number, row: number) {
//   const x = 1 + (col * (BOX_SIZE + 1));
//   const y = 1 + (row * (BOX_SIZE + 1));
//   return { x, y };
// }

// function drawSquare(col: number, row: number) {
//   const { x, y } = getCoords(col, row);
//   ctx.fillRect(x, y, BOX_SIZE, BOX_SIZE);
// }

// function drawSquarePiece(col: number, row: number) {
//   ctx.fillStyle = 'red';
//   drawSquare(col, row);
//   drawSquare(col + 1, row);
//   drawSquare(col, row + 1);
//   drawSquare(col + 1, row + 1);
// }

// function drawTPiece(col: number, row: number) {
//   ctx.fillStyle = 'green';
//   drawSquare(col, row);
//   drawSquare(col, row + 1);
//   drawSquare(col, row + 2);
//   drawSquare(col + 1, row + 1);
// }

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
