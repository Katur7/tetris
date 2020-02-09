import { Coordinates, Orientation } from './pieces';
import { IPiece, JPiece, LPiece, OPiece, SPiece, TPiece, ZPiece } from './pieces';
import { Utils } from './utils';

export class Board {
  private ctx: CanvasRenderingContext2D;
  private board: Square[][];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.board = [];
  }

  setSquare(col: number, row: number, color: string) {
    const square = this.getSquare(col, row);
    square.filled = true;
    square.color = color;
    this.ctx.fillStyle = color;
    Utils.drawSquare(col, row, this.ctx);
  }

  clearSquare(col: number, row: number) {
    const square = this.getSquare(col, row);
    square.filled = false;
    square.color = undefined;
    Utils.clearSquare(col, row, this.ctx);
  }

  isLegalMove(nextCoords: Coordinates[]) {
    const willHitBottom = this.willHitBottom(nextCoords);
    const willHitLeftSide = this.willHitLeftSide(nextCoords);
    const willHitRightSide = this.willHitRightSide(nextCoords);
    if (willHitBottom || willHitLeftSide || willHitRightSide) {
      return false;
    } else {
      if (this.willHitFilledSquare(nextCoords)) {
        return false;
      } else {
        return true;
      }
    }
  }

  clearFilledRows() {
    let filledRows = 0;
    for (let i = 0; i < 20; i++) {
      const row = this.board[i];
      const isFilledRow = row.every(s => s.filled);
      if (isFilledRow) {
        filledRows++;
        this.clearRow(i);
        for (let j = i - 1; j >= 0; j--) {
          this.moveRowDown(j);
        }
      }
    }
    return filledRows;
  }

  startMessage() {
    this.fillBoard();

    // Background
    this.ctx.fillStyle = 'grey';
    this.ctx.globalAlpha = 0.6;
    this.ctx.fillRect(45, 45, 310, 710);
    this.ctx.globalAlpha = 1.0;

    // Text
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.font = '40px Bungee';
    this.ctx.fillText('Tetris', 200, 300);
    this.ctx.font = '15px Bungee';
    this.ctx.fillText('By Katur', 200, 330);

    this.ctx.font = '15px Bungee';
    this.ctx.fillText('Press space to start a new game', 200, 500);
  }

  gameOver() {
    // Background
    this.ctx.fillStyle = 'grey';
    this.ctx.globalAlpha = 0.6;
    this.ctx.fillRect(45, 45, 310, 710);
    this.ctx.globalAlpha = 1.0;

    // Text
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.font = '40px Bungee';
    this.ctx.fillText('Game over', 200, 350);

    this.ctx.font = '15px Bungee';
    this.ctx.fillText('Press space to start a new game', 200, 480);
  }

  clearBoard() {
    this.ctx.clearRect(0 , 0, Utils.WIDTH, Utils.HEIGHT);
    this.initializeBoard();
    this.drawGrid();
  }

  private clearRow(rowIndex: number) {
    for (let i = 0; i < 10; i++) {
      this.clearSquare(i, rowIndex);
    }
  }

  private moveRowDown(rowIndex: number) {
    for (let i = 0; i < 10; i++) {
      const square = this.board[rowIndex][i];
      if (square.filled && square.color) {
        this.setSquare(i, rowIndex + 1, square.color);
        this.clearSquare(i, rowIndex);
      }
    }
  }

  private willHitBottom(nextCoords: Coordinates[]) {
    return nextCoords.some(coord => coord.y >= 20);
  }

  private willHitLeftSide(nextCoords: Coordinates[]) {
    return nextCoords.some(coord => coord.x < 0);
  }

  private willHitRightSide(nextCoords: Coordinates[]) {
    return nextCoords.some(coord => coord.x >= 10);
  }

  private willHitFilledSquare(nextCoords: Coordinates[]) {
    return nextCoords.some(c => {
      const square = this.getSquare(c.x, c.y);
      return square.filled;
    });
  }

  private drawGrid() {
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    for (let x = 0.5; x < Utils.WIDTH; x += Utils.BOX_SIZE + 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0.5);
      this.ctx.lineTo(x, Utils.HEIGHT);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (let y = 0.5; y < Utils.HEIGHT; y += Utils.BOX_SIZE + 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(0.5, y);
      this.ctx.lineTo(Utils.WIDTH, y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  private initializeBoard() {
    this.board = [];
    for (let i = 0; i < 20; i++) {
      const row = [] as Square[];
      for (let j = 0; j < 10; j++) {
        row.push({filled: false, color: undefined});
      }

      this.board.push(row);
    }
  }

  private getSquare(col: number, row: number) {
    const boardRow = this.board[row];
    if (boardRow) {
      return boardRow[col];
    } else {
      throw new Error('Row not initialized');
    }
  }

  private fillBoard() {
    new JPiece(0, 18, this.ctx).draw();
    new OPiece(1, 17, this.ctx).draw();
    new IPiece(6, 18, this.ctx).draw();
    new ZPiece(0, 15, this.ctx, Orientation.Right).draw();
    new IPiece(2, 16, this.ctx, Orientation.Right).draw();
    new SPiece(4, 18, this.ctx).draw();
    new TPiece(1, 14, this.ctx, Orientation.Right).draw();
    new LPiece(4, 17, this.ctx, Orientation.Down).draw();
    new TPiece(7, 17, this.ctx).draw();
    new JPiece(5, 16, this.ctx, Orientation.Down).draw();
    new ZPiece(4, 14, this.ctx, Orientation.Right).draw();
    new SPiece(8, 15, this.ctx, Orientation.Right).draw();
    new OPiece(6, 14, this.ctx).draw();
    new OPiece(3, 13, this.ctx).draw();
    new IPiece(8, 12, this.ctx, Orientation.Right).draw();
    new JPiece(6, 13, this.ctx, Orientation.Down).draw();
    new TPiece(4, 11, this.ctx, Orientation.Down).draw();
    new TPiece(-1, 13, this.ctx, Orientation.Right).draw();
    new LPiece(0, 11, this.ctx, Orientation.Right).draw();
    new JPiece(-1, 10, this.ctx, Orientation.Right).draw();
    new SPiece(2, 11, this.ctx).draw();
    new SPiece(7, 11, this.ctx).draw();
    new LPiece(5, 10, this.ctx).draw();
    new ZPiece(2, 9, this.ctx, Orientation.Right).draw();
    new OPiece(8, 9, this.ctx).draw();
    new JPiece(4, 9, this.ctx).draw();
    new ZPiece(4, 8, this.ctx).draw();
    new TPiece(0, 8, this.ctx).draw();
    new ZPiece(0, 6, this.ctx, Orientation.Right).draw();
    new LPiece(3, 7, this.ctx, Orientation.Down).draw();
    new SPiece(6, 7, this.ctx, Orientation.Right).draw();
    new TPiece(7, 6, this.ctx, Orientation.Left).draw();
    new IPiece(8, 5, this.ctx, Orientation.Right).draw();
    new JPiece(1, 6, this.ctx, Orientation.Right).draw();
    new IPiece(4, 5, this.ctx).draw();
    new IPiece(-1, 3, this.ctx, Orientation.Right).draw();
    new TPiece(1, 4, this.ctx).draw();
    new OPiece(4, 4, this.ctx).draw();
    new OPiece(7, 4, this.ctx).draw();
    new ZPiece(1, 2, this.ctx, Orientation.Right).draw();
    new LPiece(3, 3, this.ctx, Orientation.Down).draw();
    new JPiece(5, 3, this.ctx, Orientation.Right).draw();
    new SPiece(8, 2, this.ctx, Orientation.Right).draw();
    new LPiece(-1, 0, this.ctx, Orientation.Right).draw();
    new OPiece(1, 0, this.ctx).draw();
    new TPiece(8, 0, this.ctx, Orientation.Left).draw();
    new IPiece(4, 1, this.ctx).draw();
    new SPiece(6, 0, this.ctx).draw();
    new ZPiece(5, -1, this.ctx, Orientation.Right).draw();
    new TPiece(2, 0, this.ctx, Orientation.Right).draw();
    new JPiece(2, -1, this.ctx, Orientation.Down).draw();
  }
}

export interface Square {
  filled: boolean;
  color: string | undefined;
}
