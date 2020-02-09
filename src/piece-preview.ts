import { IPiece } from './pieces/i-piece';
import { OPiece } from './pieces/o-piece';
import { Piece, PieceType } from './pieces/piece';
import { TPiece } from './pieces/t-piece';

export class PiecePreview {
  private ctx: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById('nextPiece') as HTMLCanvasElement;
    const nextPieceCtx = canvas.getContext('2d');
    if (nextPieceCtx) {
      this.ctx = nextPieceCtx;
    } else {
      throw new Error('NextPiece context not found');
    }
  }

  setNextPiece(pieceType: PieceType) {
    this.ctx.clearRect(0, 0, 181, 141);
    let piece: Piece;
    switch (pieceType) {
      case 'I':
        piece = new IPiece(0.25, 0.25, this.ctx);
        break;
      case 'O':
        piece = new OPiece(1.25, 0.75, this.ctx);
        break;
      case 'T':
        piece = new TPiece(0.75, 0.75, this.ctx);
        break;
      default:
        throw new Error('PieceType not supported: ' + pieceType);;
    }
    piece.draw();
  }
}
