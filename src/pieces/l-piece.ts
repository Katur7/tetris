import { Piece } from './piece';

export class LPiece extends Piece {
  getColor() {
    return 'darkkhaki';
  }

  protected getUpCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
      {x: x + 2, y},
      {x: x + 2, y: y + 1}
    ];
  }

  protected getRightCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x: x + 1, y},
      {x: x + 1, y: y + 1},
      {x: x + 2, y: y + 2},
      {x: x + 1, y: y + 2}
    ];
  }

  protected getDownCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x: x + 1, y},
      {x, y: y + 1},
      {x: x + 2, y}
    ];
  }

  protected getLeftCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x: x + 1, y},
      {x: x + 1, y: y + 1},
      {x, y},
      {x: x + 1, y: y + 2}
    ];
  }
}
