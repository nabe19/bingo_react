import React, { FormEventHandler, useState } from 'react';
import BingoCard from './BingoCard';
import BingoCardContainer from './modules/BingoCardContainer';

export default function App() {
  const [columns, setColumns] = useState(5); // カードの列数、縦横共通
  const [maxNumber, setMaxNumber] = useState(75); // ビンゴボールの最大数

  const parseValue = (value: string, defaultValue: number):number => {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return defaultValue;
    }
    return parsed;
  };

  // const balls: Set<number> = new Set([0]); // 選ばれたボールの履歴
  const card: BingoCardContainer = new BingoCardContainer(columns, maxNumber); // ビンゴカード

  return (
    <div>
      列数：
      {columns} 
      ボール数：
      {maxNumber}
      <hr />
      <BingoCard
        columns={card.columns}
        maxNumber={card.maxNumber}
        squares={card.squares}
      />
    </div>
  );
}
