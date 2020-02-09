import { Board } from './board';
import { Controls, Input } from './controls';
import { PiecePreview } from './piece-preview';
import { Score } from './score';
import { Utils } from './utils';
import { PieceService } from './piece-service';
import { Piece, PieceType } from './pieces/piece';
import { IPiece } from './pieces/i-piece';
import { OPiece } from './pieces/o-piece';
import { TPiece } from './pieces/t-piece';
import { JPiece } from './pieces/j-piece';
import { LPiece } from './pieces/l-piece';
import { SPiece } from './pieces/s-piece';
import { ZPiece } from './pieces/z-piece';

export class Game {
  private score: Score;
  private board: Board;
  private piecePreview: PiecePreview;
  private controls: Controls;
  private pieceService: PieceService;

  private ctx: CanvasRenderingContext2D;
  private lastGameTick: number | undefined;
  private lastMoved: {last: Input, timestamp: number};
  private activePiece!: Piece;
  private nextPiece: PieceType;

  constructor(ctx: CanvasRenderingContext2D) {
    this.score = new Score();
    this.board = new Board(ctx);
    this.piecePreview = new PiecePreview();
    this.controls = new Controls();
    this.pieceService = new PieceService();
    this.ctx = ctx;
    this.lastMoved = {last: Input.Space, timestamp: 0};

    this.board.clearBoard();
    this.board.startMessage();
    this.nextPiece = this.pieceService.getNextPiece();
    this.piecePreview.setNextPiece(this.nextPiece);

    this.controls.awaitSpace()
    .then(() => {
      this.start();
    });
  }

  start() {
    this.board.clearBoard();
    this.score.resetScore();

    this.setNextPiece();

    // TODO: start music
    window.requestAnimationFrame((time) => this.onFrame(time));
  }

  onFrame(timestamp: number) {
    if(!this.lastGameTick) this.lastGameTick = timestamp;
    const delta = timestamp - this.lastGameTick;

    const { moved, lock } = this.handleInput(timestamp);
    let shouldRedraw = moved;
    let getNewPiece = false;

    if (lock) {
      this.lastGameTick = timestamp;
      this.savePieceToBoard();
      getNewPiece = true;
    } else if (delta >= this.dropTime()) {
      this.lastGameTick = timestamp;
      // console.log(delta);

      // Move piece down one
      const downCoords = Utils.moveCoordsDown(this.activePiece.getCoords());
      if (this.board.isLegalMove(downCoords)) {
        this.activePiece.moveDown();
        shouldRedraw = true;
      } else {
        this.savePieceToBoard();
        getNewPiece = true;
      }
    }

    if (getNewPiece) {
      this.setNextPiece();
      if (this.isGameOver(this.activePiece)) {
        this.gameOver();
        return;
      } else {
        this.activePiece.draw();
      }
    } else if (shouldRedraw) {
      this.activePiece.draw();
    }

    window.requestAnimationFrame((time) => this.onFrame(time));
  }

  private handleInput(timestamp: number) {
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
        if(!this.moveTimeoutPassed(lastInput, timestamp)) break;
        this.updateLastMoved(lastInput, timestamp);
        const leftCoords = Utils.moveCoordsLeft(this.activePiece.getCoords());
        if (this.board.isLegalMove(leftCoords)) {
          this.activePiece.moveLeft();
          moved = true;
        }
        break;
      case Input.Right:
        if(!this.moveTimeoutPassed(lastInput, timestamp)) break;
        this.updateLastMoved(lastInput, timestamp);
        const rightCoords = Utils.moveCoordsRight(this.activePiece.getCoords());
        if (this.board.isLegalMove(rightCoords)) {
          this.activePiece.moveRight();
          moved = true;
        }
        break;
      case Input.Down:
        if(!this.moveTimeoutPassed(lastInput, timestamp)) break;
        this.updateLastMoved(lastInput, timestamp);
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
    if(filledRows > 0) {
      this.score.clearLineBonus(filledRows);
    }
  }

  private isGameOver(nextPiece: Piece) {
    const coords = nextPiece.getCoords();
    return !this.board.isLegalMove(coords);
  }

  private gameOver() {
    this.board.gameOver();
    this.controls.awaitSpace()
    .then(() => {
      this.start();
    });
  }

  private setNextPiece() {
    this.activePiece = this.typeToPiece(this.nextPiece);
    this.nextPiece = this.pieceService.getNextPiece();
    this.piecePreview.setNextPiece(this.nextPiece);
    this.activePiece.draw();
  }

  private typeToPiece(type: PieceType) {
    switch (type) {
      case 'I':
        return new IPiece(3, 0, this.ctx);
      case 'J':
        return new JPiece(3, 0, this.ctx);
      case 'L':
        return new LPiece(3, 0, this.ctx);
      case 'O':
        return new OPiece(4, 0, this.ctx);
      case 'S':
        return new SPiece(3, 0, this.ctx);
      case 'T':
        return new TPiece(3, 0, this.ctx);
      case 'Z':
        return new ZPiece(3, 0, this.ctx);
      default:
        throw new Error('PieceType not supported: ' + type);
    }
  }

  private dropTime() {
    const level = this.score.level;
    if(level < 10) {
      return 600 - (50 * (level - 1));
    } else {
      return 200 - (10 * (level - 9));
    }
  }

  private moveTimeoutPassed(move: Input, timestamp: number) {
    if(move === this.lastMoved.last) {
      const delta = timestamp - this.lastMoved.timestamp;
      if(delta > 80) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  private updateLastMoved(move: Input, timestamp: number) {
    this.lastMoved.last = move;
    this.lastMoved.timestamp = timestamp;
  }
}
