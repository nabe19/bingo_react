import { useState } from 'react';
import { generate2DArray, getNewNumber, rangeNumRecord, transpose } from './Common';

type BingoCardType = {
  columns: number,
  maxNumber: number,
};
export function useBingoCard(props:BingoCardType) {
  const { columns, maxNumber } = props;
  const [hitSquares, setHitSquares] = useState<boolean[][]>(Array);
  const [squares, setSquares] = useState<number[][]>(Array);

  const resetBingoCard = () => {
    let temp: number[][] = [];
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
              temp.map(((element) => element[verIndex])),
              rangeNumRecord(props.maxNumber, props.columns) * verIndex + 1,
              Math.min(rangeNumRecord(props.maxNumber, props.columns) * (verIndex + 1), props.maxNumber),
            ),
          );
        }
      }
      temp.push(cardRecord);
    }
    setSquares(temp);

    setHitSquares(generate2DArray(columns, columns, false).map((arr, i) => {
      if (i === Math.floor(columns / 2)) {
        return arr.map((_col, j) => j === Math.floor(columns / 2));
      }
      return arr;
    }));
    return null;
  }

  const verticalLine = (index: number) => squares.map((element) => element[index]);

  const diagonal = (arr: boolean[][]) => {
    if (arr.length <= 0) return arr;
    const result: boolean[][] = Array(2);
    result[0] = [];
    result[1] = [];
    for (let i = 0; i < arr.length; i += 1) {
      result[0].push(arr[i][i]);
      result[1].push(arr[i][arr.length - 1 - i]);
    }
    return result;
  };

  const countHitSquares = (target: number):number => {
    const func1 = (arr: boolean[]): number => arr.reduce(
      (count:number, hitSq: boolean) => {
        if (hitSq) {
          return count + 1;
        }
        return count;
      },
      0,
    );
    const func2 = (targetCount: number, count: number) => {
      if (count === target) {
        return targetCount + 1;
      }
      return targetCount;
    };

    const countHorizontal: number = hitSquares.map(func1).reduce(func2, 0);
    const countVertical: number = transpose(hitSquares).map(func1).reduce(func2, 0);
    const countDiagonal: number = diagonal(hitSquares).map(func1).reduce(func2, 0);
    return countHorizontal + countVertical + countDiagonal;
  };

  const reachCount = (): number => countHitSquares(columns - 1);

  const bingoCount = (): number => countHitSquares(columns);

  const check = (b: number) => {
    const horIndex = Math.ceil(
      b / rangeNumRecord(maxNumber, columns),
    ) - 1; // カードは縦列ごと数の範囲が決まっているため、計算で横位置が確定する
    const verIndex = verticalLine(horIndex).indexOf(b);
    if (verIndex !== -1) {
      setHitSquares((prevValue) => prevValue.map((hitLine, i) => {
        if (i === verIndex) {
          return hitLine.map((hitSq, j) => {
            if (j === horIndex) {
              return true;
            }
            return hitSq;
          });
        }
        return hitLine;
      }));
    }

  }


  return {squares, hitSquares, resetBingoCard, reachCount, bingoCount, check };
}
