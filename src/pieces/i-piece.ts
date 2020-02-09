import { Piece, PieceType } from './piece';

export class IPiece extends Piece {
  getType(): PieceType {
    return 'I';
  }

  getColor() {
    return 'yellow';
  }

  protected getUpCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
      {x: x + 2, y: y + 1},
      {x: x + 3, y: y + 1}
    ];
    
  }

  protected getRightCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x: x + 1, y},
      {x: x + 1, y: y + 1},
      {x: x + 1, y: y + 2},
      {x: x + 1, y: y + 3}
    ];
  }

  protected getDownCoords() {
    return this.getUpCoords();
  }

  protected getLeftCoords() {
    return this.getRightCoords();
  }
}
