import { Piece } from './piece';

export class OPiece extends Piece {
  getColor() {
    return 'yellow';
  }

  protected getUpCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x: x + 1, y},
      {x, y: y + 1},
      {x: x + 1, y: y + 1}
    ];
  }

  protected getRightCoords() {
    return this.getUpCoords();
  }

  protected getDownCoords() {
    return this.getUpCoords();
  }

  protected getLeftCoords() {
    return this.getUpCoords();
  }
}
