import { Board } from './board';
import { Controls, Input } from './controls';
import { IPiece } from './pieces/iPiece';
import { OPiece } from './pieces/oPiece';
import { Coordinates, Piece } from './pieces/piece';
import { Utils } from './utils';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private board: Board;
  private controls: Controls;
  private lastFrame: number;
  private isPlaying: boolean;
  private activePiece: Piece;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.controls = new Controls();
    this.isPlaying = false;

    this.lastFrame = +new Date();
    this.activePiece = new IPiece(this.ctx);
  }

  public start() {
    // reset board

    // start music
    this.lastFrame = +new Date();
    this.isPlaying = true;
    this.activePiece = new IPiece(this.ctx);
    window.requestAnimationFrame(() => this.onFrame());
  }

  public onFrame() {
    const now = +new Date();
    const delta = now - this.lastFrame;

    // Handle controls
    const lastInput = this.controls.getLastInput();
    let shouldRedraw = false;
    switch (lastInput) {
      case Input.Up:
        // Rotate active piece
        break;
      case Input.Left:
        // Move active piece
        const leftCoords = Utils.moveCoordsLeft(this.activePiece.getCoords());
        if (this.board.isLegalMove(leftCoords)) {
          this.activePiece.moveLeft();
          shouldRedraw = true;
        }
        break;
      case Input.Right:
        // Move active piece
        const rightCoords = Utils.moveCoordsRight(this.activePiece.getCoords());
        if (this.board.isLegalMove(rightCoords)) {
          this.activePiece.moveRight();
          shouldRedraw = true;
        }
        break;
      case Input.Down:
        const downCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
        if (this.board.isLegalMove(downCoords)) {
          this.activePiece.moveDown();
          shouldRedraw = true;
        }
        break;
      case Input.Space:
        // Move active piece all the way down
        break;
      default:
        break;
    }

    if (delta >= 600) {
      this.lastFrame = +new Date();
      // console.log(delta);

      // Move piece down one
      const downCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
      if (this.board.isLegalMove(downCoords)) {
        this.activePiece.moveDown();
        shouldRedraw = true;
      } else {
        // save piece to board
        for (const coord of this.activePiece.getCoords()) {
          this.board.setSquare(coord.x, coord.y, 'blue');
        }
        this.activePiece = this.getNextPiece();
      }
    }

    if (shouldRedraw) {
      this.activePiece.draw();
    }
    window.requestAnimationFrame(() => this.onFrame());
  }

  private getNextPiece(): Piece {
    const randomNumer = Math.floor(Math.random() * 2) + 1;
    switch (randomNumer) {
      case 1:
        return new IPiece(this.ctx);
      case 2:
        return new OPiece(this.ctx);
      default:
        return new OPiece(this.ctx);
    }
  }
}
