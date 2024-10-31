import React, { useState } from 'react'
import BingoCard from './components/BingoCard';
import { useBingoCard } from './components/BingoCardContainer';
import { getNewNumber, } from './components/Common';
import './App.css'

function App() {
  const columns = 5; // カードの列数、縦横共通
  const maxNumber = 75;
  //  const balls:Set<number> = new Set([0]);
  const [balls, setBalls] = useState<number[]>([0]); // 選ばれたボールの履歴
  const [initialized, setInitialized] = useState<boolean>(false);
  const [ball, setBall] = useState<number>(0);
  const { squares, hitSquares, resetBingoCard, reachCount, bingoCount, check } = useBingoCard({ columns, maxNumber });

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

  const reset = () => {
    setBalls([0]);
    resetBingoCard();
  };

  const ballGet = () => {
    if (balls.length >= maxNumber + 1) return;
    const b = getNewNumber(balls, 1, maxNumber);
    setBall(b);
    setBalls((prevValue) => prevValue.concat(b));
    check(b);
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
        出たボール：
        {(ball === 0) ? 'まだボールがないです。' : `${ball}番`}
        <br />
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
        次のボール
      </button>
    </div>
  );
}

export default App
