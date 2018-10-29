import { Utils } from '../utils';
import { Piece } from './piece';

export class IPiece extends Piece {
  public draw() {
    this.ctx.fillStyle = 'yellow';
    const coords = this.getCoords();
    for (const c of coords) {
      Utils.drawSquare(c.x, c.y, this.ctx);
    }
  }

  public getCoords() {
    const x = this.col;
    const y = this.row;
    return  [
      {x, y},
      {x, y: y + 1},
      {x, y: y + 2},
      {x, y: y + 3}
    ];
  }
}
