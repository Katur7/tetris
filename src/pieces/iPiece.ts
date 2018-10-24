import { Utils } from '../utils';
import { Piece } from './piece';

export class IPiece extends Piece {
  draw() {
    this.drawUp();
  }

  clear() {
    Utils.clearSquare(this.xCoord, this.yCoord, this.ctx);
    Utils.clearSquare(this.xCoord, this.yCoord + 1, this.ctx);
    Utils.clearSquare(this.xCoord, this.yCoord + 2, this.ctx);
    Utils.clearSquare(this.xCoord, this.yCoord + 3, this.ctx);
  }

  getCoords() {
    const x = this.xCoord;
    const y = this.yCoord;
    return  [
      {x, y},
      {x, y: y + 1},
      {x, y: y + 2},
      {x, y: y + 3},
    ];
  }

  drawUp() {
    this.ctx.fillStyle = 'yellow';
    Utils.drawSquare(this.xCoord, this.yCoord, this.ctx);
    Utils.drawSquare(this.xCoord, this.yCoord + 1, this.ctx);
    Utils.drawSquare(this.xCoord, this.yCoord + 2, this.ctx);
    Utils.drawSquare(this.xCoord, this.yCoord + 3, this.ctx);
  }

  drawDown() {}

  drawLeft() {}

  drawRight() {}
}