import { Utils } from './../utils';

export abstract class Piece {
  protected ctx: CanvasRenderingContext2D;
  // protected orientation: Orientation;
  protected col: number;
  protected row: number;

  constructor(col: number, row: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.col = col;
    this.row = row;
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
    this.row += 1;
  }

  public moveLeft() {
    this.clear();
    this.col -= 1;
  }

  public moveRight() {
    this.clear();
    this.col += 1;
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
