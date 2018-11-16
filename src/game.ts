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

  start() {
    // reset board

    // start music
    this.lastFrame = +new Date();
    this.isPlaying = true;
    window.requestAnimationFrame(() => this.onFrame());
  }

  onFrame() {
    const now = +new Date();
    const delta = now - this.lastFrame;

    const { moved, lock } = this.handleInput();
    let shouldRedraw = moved;

    if (lock) {
      this.lastFrame = +new Date();
      this.savePieceToBoard();
    } else if (delta >= 600) {
      this.lastFrame = +new Date();
      // console.log(delta);

      // Move piece down one
      const downCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
      if (this.board.isLegalMove(downCoords)) {
        this.activePiece.moveDown();
        shouldRedraw = true;
      } else {
        this.savePieceToBoard();
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
    let lock = false;
    switch (lastInput) {
      case Input.Up:
        // Rotate active piece
        const rotatedCoords = this.activePiece.getRotatedCoords();
        if (this.board.isLegalMove(rotatedCoords)) {
          this.activePiece.rotate();
          moved = true;
        }
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
        moved = true;
        lock = true;

        let spaceCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
        while (this.board.isLegalMove(spaceCoords)) {
          this.activePiece.moveDown();
          this.score.moveDownBonus();
          spaceCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
        }
        break;
      default:
        break;
    }
    return { moved, lock };
  }

  private savePieceToBoard() {
    for (const coord of this.activePiece.getCoords()) {
      this.board.setSquare(coord.x, coord.y, this.activePiece.getColor());
    }

    const filledRows = this.board.clearFilledRows();
    this.score.clearLineBonus(filledRows);

    this.activePiece = this.nextPiece.useNextPiece();
  }
}
