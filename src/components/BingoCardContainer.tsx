import { getNewNumber, rangeNumRecord } from './Common';

type BingoCardType = {
  columns: number,
  maxNumber: number,
};
export function BingoCardContainer(props:BingoCardType) {
  const squares: number[][] = [];
  let cardRecord: number[];
  for (let horIndex = 0; horIndex < props.columns; horIndex += 1) {
    cardRecord = new Array(0);
    for (let verIndex = 0; verIndex < props.columns; verIndex += 1) {
      if (horIndex === Math.floor(props.columns / 2)
          && verIndex === Math.floor(props.columns / 2)) {
        cardRecord.push(0);
      } else {
        cardRecord.push(
          getNewNumber(
            squares.map(((element) => element[verIndex])),
            rangeNumRecord(props.maxNumber, props.columns) * verIndex + 1,
            Math.min(rangeNumRecord(props.maxNumber, props.columns) * (verIndex + 1), props.maxNumber),
          ),
        );
      }
    }
    squares.push(cardRecord);
  }
  return squares;
}
