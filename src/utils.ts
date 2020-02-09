import { Coordinates } from './pieces/piece';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class Utils {
  static HEIGHT = canvas.height;
  static WIDTH = canvas.width;
  static BOX_SIZE = 40;
  static GRID_GAP = 41;

  static getCoords(col: number, row: number) {
    const x = 1 + (col * (this.BOX_SIZE + 1));
    const y = 1 + (row * (this.BOX_SIZE + 1));
    return { x, y };
  }

  static drawSquare(col: number, row: number, ctx: CanvasRenderingContext2D) {
    const { x, y } = Utils.getCoords(col, row);
    ctx.fillRect(x, y, this.BOX_SIZE, this.BOX_SIZE);
  }

  static clearSquare(col: number, row: number, ctx: CanvasRenderingContext2D) {
    const { x, y } = Utils.getCoords(col, row);
    ctx.clearRect(x, y, this.BOX_SIZE, this.BOX_SIZE);
  }

  static moveCoordsDown(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x, y: c.y + 1 };
    });
  }

  static moveCoordsLeft(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x - 1, y: c.y };
    });
  }

  static moveCoordsRight(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x + 1, y: c.y };
    });
  }
}
