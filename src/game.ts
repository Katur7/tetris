import { Controls, Input } from './controls';
import { IPiece } from './pieces/iPiece';
import { Piece, Coordinates } from './pieces/piece';
import { Board } from './board';
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

    this.board.drawGrid();
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
    let nextCoords: Array<Coordinates>;
    let shouldRedraw = false;
    switch (lastInput) {
      case Input.Up:
        // Rotate active piece
        break;
      case Input.Left:
        // Move active piece
        nextCoords = Utils.moveCoordsLeft(this.activePiece.getCoords());
        if (!this.board.willHitLeftSide(nextCoords)) {
          this.activePiece.moveLeft();
          shouldRedraw = true;
        }
        break;
      case Input.Right:
        // Move active piece
        nextCoords = Utils.moveCoordsRight(this.activePiece.getCoords());
        if (!this.board.willHitRightSide(nextCoords)) {
          this.activePiece.moveRight();
          shouldRedraw = true;
        }
        break;
      case Input.Down:
        // Move active piece
        break;
      case Input.Space:
        // Move active piece all the way down
        break;
      default:
        break;
    }

    if (delta >= 600) {
      // console.log(delta);
      this.lastFrame = +new Date();
      // Move piece down one
      const currCoords = nextCoords || this.activePiece.getCoords();
      nextCoords = Utils.moveCoordsDown(currCoords);
      if (!this.board.willHitBottom(nextCoords)) {
        this.activePiece.moveDown();
        shouldRedraw = true;
      } else {
        // save piece to board
      }
    }

    if (shouldRedraw) {
      this.activePiece.draw();
    }
    window.requestAnimationFrame(() => this.onFrame());
  }
}