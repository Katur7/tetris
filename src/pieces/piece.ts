import { Utils } from './../utils';

export abstract class Piece {
  protected ctx: CanvasRenderingContext2D;
  protected orientation: Orientation;
  protected col: number;
  protected row: number;

  constructor(col: number, row: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.col = col;
    this.row = row;
    this.orientation = Orientation.Up;
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

  public rotate() {
    this.clear();
    this.orientation = this.getRotatedOrientation();
  }

  public getCoords(): Coordinates[] {
    return this.getCoordsFromOrientation(this.orientation);
  }

  public getRotatedCoords(): Coordinates[] {
    const nextOrientation = this.getRotatedOrientation();
    return this.getCoordsFromOrientation(nextOrientation);
  }

  public draw() {
    this.ctx.fillStyle = this.getColor();
    const coords = this.getCoords();
    for (const c of coords) {
      Utils.drawSquare(c.x, c.y, this.ctx);
    }
  }

  public abstract getType(): PieceType;

  protected getRotatedOrientation() {
    return (this.orientation + 1) % 4;
  }

  protected abstract getUpCoords(): Coordinates[];
  protected abstract getRightCoords(): Coordinates[];
  protected abstract getDownCoords(): Coordinates[];
  protected abstract getLeftCoords(): Coordinates[];
  protected abstract getColor(): string;

  private getCoordsFromOrientation(o: Orientation) {
    switch (o) {
      case Orientation.Up:
        return this.getUpCoords();
      case Orientation.Right:
        return this.getRightCoords();
      case Orientation.Down:
        return this.getDownCoords();
      case Orientation.Left:
        return this.getLeftCoords();
      default:
        throw new Error('Orientiation not supported: ' + o);
    }
  }
}

export enum Orientation {
  Up,
  Right,
  Down,
  Left
}

export interface Coordinates {
  x: number;
  y: number;
}

export type PieceType = 'I' | 'O' | 'T' | 'J' | 'L' | 'Z' | 'N';
