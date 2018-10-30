export class Score {
  private scoreEl: HTMLSpanElement;
  private score: number;

  constructor() {
    this.scoreEl = document.getElementById('score') as HTMLSpanElement;
    this.score = 0;
    this.updateScore();
  }

  public clearLineBonus(clearedLines: number) {
    this.score += 100 * clearedLines;
    this.updateScore();
  }

  public moveDownBonus() {
    this.score += 10;
    this.updateScore();
  }

  private updateScore() {
    this.scoreEl.innerText = this.score.toString();
  }
}
