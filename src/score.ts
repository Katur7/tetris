export class Score {
  // TODO: display level and lines
  public level = 1;

  private scoreEl: HTMLSpanElement;
  private score!: number;
  private lines = 0;

  constructor() {
    this.scoreEl = document.getElementById('score') as HTMLSpanElement;
    this.resetScore();
  }

  clearLineBonus(clearedLines: number) {
    this.score += 100 * clearedLines;
    this.lines += clearedLines;
    if(this.lines % 10 === 0) {
      this.level++;
    }
    this.updateScore();
  }

  // TODO: 2x the score for hard drop
  // TODO: Don't update score every time in case of hard drop
  moveDownBonus() {
    this.score += 10;
    this.updateScore();
  }

  resetScore() {
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.updateScore();
  }

  private updateScore() {
    this.scoreEl.innerText = this.score.toString();
  }
}
