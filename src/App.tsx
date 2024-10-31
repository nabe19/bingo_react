import React, { useState } from 'react';
import BingoCard from './BingoCard';
import BingoCardContainer from './modules/BingoCardContainer';
import Common from './modules/Common';

export default function App() {
  const columns = 5; // カードの列数、縦横共通
  const maxNumber = 75;
  //  const balls:Set<number> = new Set([0]);
  const [balls, setBalls] = useState<number[]>([0]); // 選ばれたボールの履歴
  const [hitSquares, setHitSquares] = useState<boolean[][]>(Array);
  const [squares, setSquares] = useState<number[][]>(Array);
  const [initialized, setInitialized] = useState<boolean>(false);

  // const parseValue = (value: string | null, defaultValue:number):number => {
  //   if (value === null) {
  //     return defaultValue;
  //   }
  //   const parsed = parseInt(value, 10);
  //   if (Number.isNaN(parsed)) {
  //     return defaultValue;
  //   }
  //   return parsed;
  // };

  const rangeNumRecord = ():number => Math.ceil(maxNumber / columns);

  // https://qiita.com/kznrluk/items/790f1b154d1b6d4de398
  const transpose = (arr: boolean[][]) => {
    if (arr.length <= 0) return arr;
    return arr[0].map((_, c) => arr.map((r) => r[c]));
  };
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

  // https://qiita.com/butchi_y/items/db3078dced4592872a9c
  const generate2DArray = (
    m: number,
    n: number,
    val: number | boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ) => [...Array(m)].map((_) => Array(n).fill(val));

  const verticalLine = (index: number) => squares.map((element) => element[index]);

  const reachCount = (): number => countHitSquares(columns - 1);

  const bingoCount = (): number => countHitSquares(columns);

  const reset = () => {
    setBalls([0]);
    setSquares(BingoCardContainer({ columns, maxNumber }));
    setHitSquares(generate2DArray(columns, columns, false).map((arr, i) => {
      if (i === Math.floor(columns / 2)) {
        return arr.map((col, j) => j === Math.floor(columns / 2));
      }
      return arr;
    }));
  };

  const ballGet = () => {
    if (balls.length >= maxNumber + 1) return;
    const ball:number = Common.getNewNumber(balls, 1, maxNumber);
    setBalls((prevValue) => prevValue.concat(ball));
    const horIndex = Math.ceil(ball / rangeNumRecord()) - 1; // カードは縦列ごと数の範囲が決まっているため、計算で横位置が確定する
    const verIndex = verticalLine(horIndex).indexOf(ball);
    if (verIndex !== -1) {
      setHitSquares((prevValue) => prevValue.map((hitLine, i) => {
        if (i === horIndex) {
          return hitLine.map((hitSq, j) => {
            if (j === verIndex) {
              return true;
            }
            return hitSq;
          });
        }
        return hitLine;
      }));
    }
  };

  React.useEffect(() => {
    if (!initialized) {
      reset();
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <div>
      列数：
      {columns}
      {/* <input
        type="number"
        name="columns"
        defaultvalue={columns}
      /> */}
      ボール数：
      {maxNumber}
      {/* <input
        type="number"
        name="columns"
        defaultvalue={maxNumber}
      /> */}
      <button
        type="button"
        onClick={reset}
      >
        リセット
      </button>
      <hr />
      <BingoCard
        squares={squares}
        hitSquares={hitSquares}
        maxNumber={maxNumber}
      />
      <div>
        リーチ：
        {reachCount()}
        <br />
        ビンゴ：
        {bingoCount()}
      </div>
      <button
        type="button"
        onClick={ballGet}
      >
        ボール排出
      </button>
    </div>
  );
}
