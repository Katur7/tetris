import { Piece } from './piece';

export class SPiece extends Piece {
  getColor() {
    return 'limegreen';
  }

  protected getUpCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
      {x: x + 1, y},
      {x: x + 2, y}
    ];
  }

  protected getRightCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
      {x: x + 1, y: y + 2}
    ];
  }

  protected getDownCoords() {
    return this.getUpCoords();
  }

  protected getLeftCoords() {
    return this.getRightCoords();
  }
}
