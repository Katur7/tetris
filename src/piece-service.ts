import { PieceType } from './pieces/piece';

export class PieceService {
  private bag: PieceType[];

  constructor() {
    this.bag = this.getShuffledBag();
  }

  getNextPiece(): PieceType {
    if(this.bag.length === 0) {
      this.bag = this.getShuffledBag();
    }
    return this.bag.pop() as PieceType;
  }

  private getShuffledBag(): PieceType[] {
    return this.shuffle(['I', 'O', 'T', 'J', 'L', 'Z', 'S']);
  }

  private shuffle(array: PieceType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}