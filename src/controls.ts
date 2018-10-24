export class Controls {
  private lastInput: Input;
  constructor() {
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
}

export enum Input {
  Up = 1,
  Down,
  Left,
  Right,
  Space
}
