export abstract class Piece {
  protected ctx: CanvasRenderingContext2D;
  protected orientation: Orientation;
  protected xCoord: number;
  protected yCoord: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.xCoord = 8;
    this.yCoord = 0;
    this.draw();
  }

  moveDown() {
    this.clear();
    this.yCoord += 1;
  }

  moveLeft() {
    this.clear();
    this.xCoord -= 1;
  }

  moveRight() {
    this.clear();
    this.xCoord += 1;
  }

  abstract draw(): void;
  abstract clear(): void;
  abstract getCoords(): Array<Coordinates>;
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