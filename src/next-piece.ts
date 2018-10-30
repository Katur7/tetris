import { IPiece } from './pieces/i-piece';
import { OPiece } from './pieces/o-piece';
import { Piece } from './pieces/piece';
import { TPiece } from './pieces/t-piece';

export class NextPiece {
  private gameCtx: CanvasRenderingContext2D;
  private ctx: CanvasRenderingContext2D;
  private nextPiece: Piece;

  constructor(ctx: CanvasRenderingContext2D) {
    this.gameCtx = ctx;

    const canvas = document.getElementById('nextPiece') as HTMLCanvasElement;
    const nextPieceCtx = canvas.getContext('2d');
    if (nextPieceCtx) {
      this.ctx = nextPieceCtx;
    } else {
      throw new Error('NextPiece context not found');
    }

    this.nextPiece = this.randomPiece();
    this.drawBackground();
  }

  public useNextPiece() {
    const nextPiece = this.nextPiece;
    this.nextPiece.clear();
    this.nextPiece = this.randomPiece();
    switch (nextPiece.constructor.name) {
      case 'IPiece':
        return new IPiece(5, 0, this.gameCtx);
      case 'TPiece':
        return new TPiece(4, 0, this.gameCtx);
      default:
        return new OPiece(4, 0, this.gameCtx);
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

  private randomPiece(): Piece {
    const randomNumer = Math.floor(Math.random() * 3) + 1;
    switch (randomNumer) {
      case 1:
        return new IPiece(1, 0, this.ctx);
      case 2:
        return new TPiece(0, 1, this.ctx);
      default:
        return new OPiece(0, 1, this.ctx);
    }
  }
}
