import { Coordinates } from './pieces/piece';
import { Utils } from './utils';

export class Board {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public drawGrid() {
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;
    for (let x = 0.5; x < Utils.WIDTH; x += Utils.GRID_GAP) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, Utils.HEIGHT);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (let y = 0.5; y < Utils.HEIGHT; y += Utils.GRID_GAP) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(Utils.WIDTH, y);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  public willHitBottom(nextCoords: Coordinates[]) {
    return nextCoords.some((coord) => coord.y >= 20);
  }

  public willHitLeftSide(nextCoords: Coordinates[]) {
    return nextCoords.some((coord) => coord.x < 0);
  }

  public willHitRightSide(nextCoords: Coordinates[]) {
    return nextCoords.some((coord) => coord.x >= 10);
  }
}
