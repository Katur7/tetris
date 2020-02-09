import { Piece } from './piece';

export class ZPiece extends Piece {
  getColor() {
    return 'red';
  }

  protected getUpCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x: x + 1, y: y + 1},
      {x: x + 1, y},
      {x: x + 2, y: y + 1}
    ];
  }

  protected getRightCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x: x + 1, y},
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
      {x, y: y + 2}
    ];
  }

  protected getDownCoords() {
    return this.getUpCoords();
  }

  protected getLeftCoords() {
    return this.getRightCoords();
  }
}
