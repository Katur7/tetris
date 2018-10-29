import { Board } from './board';
import { Controls, Input } from './controls';
import { NextPiece } from './nextPiece';
import { IPiece } from './pieces/iPiece';
import { OPiece } from './pieces/oPiece';
import { Coordinates, Piece } from './pieces/piece';
import { Utils } from './utils';

export class Game {
  private ctx: CanvasRenderingContext2D;
  private board: Board;
  private nextPiece: NextPiece;
  private controls: Controls;
  private lastFrame: number;
  private isPlaying: boolean;
  private activePiece: Piece;
  private score: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.nextPiece = new NextPiece(ctx);
    this.controls = new Controls();

    this.isPlaying = false;
    this.score = 0;
    this.lastFrame = +new Date();
    this.activePiece = this.nextPiece.useNextPiece();
  }

  public start() {
    // reset board

    // start music
    this.lastFrame = +new Date();
    this.isPlaying = true;
    window.requestAnimationFrame(() => this.onFrame());
  }

  public onFrame() {
    const now = +new Date();
    const delta = now - this.lastFrame;

    let shouldRedraw = this.handleInput();

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

        this.board.clearFilledRows();

        this.activePiece = this.nextPiece.useNextPiece();
      }
    }

    if (shouldRedraw) {
      this.activePiece.draw();
    }
    window.requestAnimationFrame(() => this.onFrame());
  }

  private handleInput() {
    const lastInput = this.controls.getLastInput();
    let moved = false;
    switch (lastInput) {
      case Input.Up:
        // Rotate active piece
        break;
      case Input.Left:
        const leftCoords = Utils.moveCoordsLeft(this.activePiece.getCoords());
        if (this.board.isLegalMove(leftCoords)) {
          this.activePiece.moveLeft();
          moved = true;
        }
        break;
      case Input.Right:
        const rightCoords = Utils.moveCoordsRight(this.activePiece.getCoords());
        if (this.board.isLegalMove(rightCoords)) {
          this.activePiece.moveRight();
          moved = true;
        }
        break;
      case Input.Down:
        const downCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
        if (this.board.isLegalMove(downCoords)) {
          this.activePiece.moveDown();
          moved = true;
        }
        break;
      case Input.Space:
        // Move active piece all the way down
        break;
      default:
        break;
    }
    return moved;
  }
}
