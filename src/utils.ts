import { Coordinates } from './pieces/piece';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

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

  static moveCoordsDown(coords: Array<Coordinates>) {
    return coords.map(coord => {
      coord.y++;
      return coord;
    });
  }

  static moveCoordsLeft(coords: Array<Coordinates>) {
    return coords.map(coord => {
      coord.x--;
      return coord;
    });
  }

  static moveCoordsRight(coords: Array<Coordinates>) {
    return coords.map(coord => {
      coord.x++;
      return coord;
    });
  }
}