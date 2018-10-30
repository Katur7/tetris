import { Board } from './board';
import { Controls, Input } from './controls';
import { NextPiece } from './next-piece';
import { Piece } from './pieces/piece';
import { Score } from './score';
import { Utils } from './utils';

export class Game {
  private score: Score;
  private board: Board;
  private nextPiece: NextPiece;
  private controls: Controls;
  private lastFrame: number;
  private isPlaying: boolean;
  private activePiece: Piece;

  constructor(ctx: CanvasRenderingContext2D) {
    this.score = new Score();
    this.board = new Board(ctx);
    this.nextPiece = new NextPiece(ctx);
    this.controls = new Controls();

    this.isPlaying = false;
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

        const filledRows = this.board.clearFilledRows();
        this.score.clearLineBonus(filledRows);

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
          this.score.moveDownBonus();
          moved = true;
        }
        break;
      case Input.Space:
        // Move active piece all the way down
        while (true) {
          const spaceCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
          if (this.board.isLegalMove(spaceCoords)) {
            this.activePiece.moveDown();
            this.score.moveDownBonus();
            moved = true;
          } else {
            // TODO: Lock piece?
            break;
          }
        }
      default:
        break;
    }
    return moved;
  }
}
