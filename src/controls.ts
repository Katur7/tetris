export class Controls {
  private lastInput: Input | undefined;
  private resolveSpace: VoidFunction | undefined;
  constructor() {
    this.resolveSpace = undefined;

    // Set up key listeners
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowUp':
          this.lastInput = Input.Up;
          break;
        case 'ArrowDown':
          this.lastInput = Input.Down;
          break;
        case 'ArrowLeft':
          this.lastInput = Input.Left;
          break;
        case 'ArrowRight':
          this.lastInput = Input.Right;
          break;
        case ' ':
          this.lastInput = Input.Space;
          if (this.resolveSpace !== undefined) {
            this.resolveSpace();
            this.resolveSpace = undefined;
            this.lastInput = undefined;
          }
          break;
        default:
          break;
      }
    });
  }

  getLastInput() {
    const last = this.lastInput;
    this.lastInput = undefined;
    return last;
  }

  awaitSpace() {
    return new Promise(resolve => {
      this.resolveSpace = resolve;
    });
  }
}

export enum Input {
  Up = 1,
  Down,
  Left,
  Right,
  Space
}

type VoidFunction = () => void;
