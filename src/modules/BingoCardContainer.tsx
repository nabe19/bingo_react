import Common from './Common';
import SquareContainer from './SquareContainer';

export default class BingoCardContainer {
  static FROM_TOP_LEFT: number = 0; // ななめ用定数

  static FROM_TOP_RIGHT: number = 1; // ななめ用定数

  readonly columns: number; // ビンゴの列数、縦横共通

  readonly rangeNumRecord: number; // 1列あたりの数字の範囲

  readonly maxNumber: number; // ビンゴマスの数字の最大

  squares: SquareContainer[][]; // ビンゴマスの集合

  verticalHits: number[]; // 当たりマス数集計縦

  horizontalHits: number[]; // 当たりマス数集計横

  diagonalHits: number[]; // 当たりマス数集計ななめ、0=左上から、1=右上から

  constructor(columns: number, maxNumber:number) {
    this.columns = columns;
    this.maxNumber = maxNumber;
    this.rangeNumRecord = Math.ceil(maxNumber / columns);
    this.squares = [];
    this.verticalHits = Array(this.columns).fill(0);
    this.horizontalHits = Array(this.columns).fill(0);
    this.diagonalHits = Array(2).fill(1); // 中央マスの分1にする

    let cardRecord: SquareContainer[];
    for (let horIndex = 0; horIndex < this.columns; horIndex += 1) {
      cardRecord = [];
      for (let verIndex = 0; verIndex < this.columns; verIndex += 1) {
        if (horIndex === Math.floor(this.columns / 2)
            && verIndex === Math.floor(this.columns / 2)) {
          cardRecord.push(new SquareContainer(0, true));
        } else {
          cardRecord.push(
            new SquareContainer(
              Common.getNewNumber(
                this.getVerticalLine(verIndex),
                this.rangeNumRecord * verIndex + 1,
                Math.min(this.rangeNumRecord * (verIndex + 1), this.maxNumber),
              ),
            ),
          );
        }
      }
      this.squares.push(cardRecord);
    }
    // 中央マスの分を加算しておく
    this.verticalHits[Math.floor(columns / 2)] = 1;
    this.horizontalHits[Math.floor(columns / 2)] = 1;
  }

  // ビンゴカードの縦列を取得
  getVerticalLine(index:number): SquareContainer[] {
    return this.squares.map((element) => element[index]);
  }

  // リーチ数集計
  getReachCount(): number {
    const arr = [...this.verticalHits, this.horizontalHits, this.diagonalHits];
    return arr.filter((element) => element === this.columns - 1).length;
  }

  // ビンゴ数集計
  getBingoCount(): number {
    const arr = [...this.verticalHits, this.horizontalHits, this.diagonalHits];
    return arr.filter((element) => element === this.columns).length;
  }

  // ボール処理
  check(ball:number) {
    // カードを検索
    const horIndex = Math.ceil(ball / this.rangeNumRecord) - 1; // カードは縦列ごと数の範囲が決まっているため、計算で横位置が確定する
    const verIndex = Common.findNumberIndex(this.getVerticalLine(horIndex), ball);
    if (verIndex !== -1) {
      // 該当マスがあったら当たり状態、集計配列に加算
      this.squares[verIndex][horIndex].hit();
      this.verticalHits[horIndex] += 1;
      this.horizontalHits[verIndex] += 1;
      if (verIndex === horIndex) {
        this.diagonalHits[BingoCardContainer.FROM_TOP_LEFT] += 1;
      } else if (verIndex + horIndex === this.columns - 1) {
        this.diagonalHits[BingoCardContainer.FROM_TOP_RIGHT] += 1;
      }
    }
  }
}
