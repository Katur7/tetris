import { IPiece } from './pieces/i-piece';
import { OPiece } from './pieces/o-piece';
import { Piece } from './pieces/piece';
import { TPiece } from './pieces/t-piece';

export class NextPiece {
  private gameCtx: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  private nextPiece!: Piece;

  constructor(ctx: CanvasRenderingContext2D) {
    this.gameCtx = ctx;

    const canvas = document.getElementById('nextPiece') as HTMLCanvasElement;
    const nextPieceCtx = canvas.getContext('2d');
    if (nextPieceCtx) {
      this.ctx = nextPieceCtx;
    } else {
      throw new Error('NextPiece context not found');
    }

    this.getNextPiece();
    this.drawBackground();
  }

  useNextPiece() {
    const nextPiece = this.nextPiece;
    this.nextPiece.clear();
    this.getNextPiece();
    const type = nextPiece.getType();
    switch (type) {
      case 'I':
        return new IPiece(5, 0, this.gameCtx);
      case 'T':
        return new TPiece(4, 0, this.gameCtx);
      case 'O':
        return new OPiece(4, 0, this.gameCtx);
      default:
        throw new Error('Piece not supported: ' + type);
    }
  }

  private drawBackground() {
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(0.5, 0.5);
    this.ctx.lineTo(123.5, 0.5);
    this.ctx.lineTo(123.5, 164.5);
    this.ctx.lineTo(0.5, 164.5);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private getNextPiece() {
    this.nextPiece = this.randomPiece();
    this.nextPiece.draw();
  }

  private randomPiece(): Piece {
    const randomNumer = Math.floor(Math.random() * 3) + 1;
    switch (randomNumer) {
      case 1:
        return new IPiece(0, 0, this.ctx);
      case 2:
        return new TPiece(0, 1, this.ctx);
      case 3:
        return new OPiece(0, 1, this.ctx);
      default:
        throw new Error('Random number not supported: ' + randomNumer);
    }
  }
}
