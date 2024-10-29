export default class SquareContainer {
  squareNum : number; // マスの数字

  isHit : boolean; // true=当たり状態

  constructor(squareNum:number, isHit?:boolean) {
    this.squareNum = squareNum;
    this.isHit = isHit ?? false;
  }

  // ビンゴマスを当たり状態にする
  hit() {
    this.isHit = true;
  }

  // Square型か判定
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isSquare(obj:any): obj is SquareContainer {
    return 'squareNum' in obj && 'isHit' in obj;
  }

  render(numberLength:number):string {
    if (this.squareNum === 0) {
      return 'FREE';
    }
    return (this.isHit ? '(' : ' ') + this.getZeroPaddingNum(numberLength) + (this.isHit ? ')' : ' ');
  }

  getZeroPaddingNum(length:number): string {
    return (Array(length).join('0') + this.squareNum).slice(-length);
  }
}
