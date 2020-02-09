export class Controls {
  private resolveSpace: VoidFunction | undefined;
  private pressedKeys: Set<Input>;

  constructor() {
    this.resolveSpace = undefined;
    this.pressedKeys = new Set<Input>();

    // Set up key listeners
    document.addEventListener('keydown', e => this.keyDownListener(e));
    document.addEventListener('keyup', e => this.keyUpListener(e));
  }

  getLastInput() {
    const last = this.pressedKeys.values().next().value;
    if(last === Input.Up || last === Input.Space) {
      this.pressedKeys.delete(last);
    }
    return last;
  }

  awaitSpace() {
    return new Promise(resolve => {
      this.resolveSpace = resolve;
    });
  }

  private keyDownListener(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.pressedKeys.add(Input.Up);
        break;
      case 'ArrowDown':
        this.pressedKeys.add(Input.Down);
        break;
      case 'ArrowLeft':
        this.pressedKeys.add(Input.Left);
        break;
      case 'ArrowRight':
        this.pressedKeys.add(Input.Right);
        break;
      case ' ':
        if (this.resolveSpace !== undefined) {
          this.resolveSpace();
          this.resolveSpace = undefined;
        } else {
          this.pressedKeys.add(Input.Space);
        }
        break;
      default:
        break;
    }
  }

  private keyUpListener(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.pressedKeys.delete(Input.Up);
        break;
      case 'ArrowDown':
        this.pressedKeys.delete(Input.Down);
        break;
      case 'ArrowLeft':
        this.pressedKeys.delete(Input.Left);
        break;
      case 'ArrowRight':
        this.pressedKeys.delete(Input.Right);
        break;
      case ' ':
        this.pressedKeys.delete(Input.Space);
        break;
      default:
        break;
    }
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
