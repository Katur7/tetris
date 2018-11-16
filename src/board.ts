import { Coordinates } from './pieces/piece';
import { Utils } from './utils';

export class Board {
  private ctx: CanvasRenderingContext2D;
  private board: Square[][];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.board = [];

    this.initializeBoard();
    this.drawGrid();
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
    for (let x = 0.5; x < Utils.WIDTH; x += Utils.GRID_GAP) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0.5);
      this.ctx.lineTo(x, Utils.HEIGHT);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (let y = 0.5; y < Utils.HEIGHT; y += Utils.GRID_GAP) {
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
}

export interface Square {
  filled: boolean;
  color: string | undefined;
}
