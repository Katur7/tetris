import { Utils } from './../utils';

export abstract class Piece {
  protected ctx: CanvasRenderingContext2D;
  // protected orientation: Orientation;
  protected xCoord: number;
  protected yCoord: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.xCoord = 5;
    this.yCoord = 0;
    this.draw();
  }

  public clear() {
    const coords = this.getCoords();
    for (const c of coords) {
      Utils.clearSquare(c.x, c.y, this.ctx);
    }
  }

  public moveDown() {
    this.clear();
    this.yCoord += 1;
  }

  public moveLeft() {
    this.clear();
    this.xCoord -= 1;
  }

  public moveRight() {
    this.clear();
    this.xCoord += 1;
  }

  public abstract draw(): void;
  public abstract getCoords(): Coordinates[];
}

export enum Orientation {
  Up,
  Down,
  Left,
  Right
}

export interface Coordinates {
  x: number;
  y: number;
}
