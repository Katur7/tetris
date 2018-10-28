import { Coordinates } from './pieces/piece';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class Utils {
  public static HEIGHT = canvas.height;
  public static WIDTH = canvas.width;
  public static BOX_SIZE = 40;
  public static GRID_GAP = 41;

  public static getCoords(col: number, row: number) {
    const x = 1 + (col * (this.BOX_SIZE + 1));
    const y = 1 + (row * (this.BOX_SIZE + 1));
    return { x, y };
  }

  public static drawSquare(col: number, row: number, ctx: CanvasRenderingContext2D) {
    const { x, y } = Utils.getCoords(col, row);
    ctx.fillRect(x, y, this.BOX_SIZE, this.BOX_SIZE);
  }

  public static clearSquare(col: number, row: number, ctx: CanvasRenderingContext2D) {
    const { x, y } = Utils.getCoords(col, row);
    ctx.clearRect(x, y, this.BOX_SIZE, this.BOX_SIZE);
  }

  public static moveCoordsDown(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x, y: c.y + 1 };
    });
  }

  public static moveCoordsLeft(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x - 1, y: c.y };
    });
  }

  public static moveCoordsRight(coords: Coordinates[]) {
    return coords.map(c => {
      return { x: c.x + 1, y: c.y };
    });
  }
}
