import { Utils } from '../utils';
import { Piece } from './piece';

export class OPiece extends Piece {
  public draw() {
    this.ctx.fillStyle = 'red';
    const coords = this.getCoords();
    for (const c of coords) {
      Utils.drawSquare(c.x, c.y, this.ctx);
    }
  }

  public clear() {
    const coords = this.getCoords();
    for (const c of coords) {
      Utils.clearSquare(c.x, c.y, this.ctx);
    }
  }

  public getCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x: x + 1, y},
      {x, y: y + 1},
      {x: x + 1, y: y + 1}
    ];
  }
}
