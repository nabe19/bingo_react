import React from 'react';
import Square from './Square';
import SquareContainer from './modules/SquareContainer';

type BingoCardType = {
  columns: number,
  maxNumber: number,
  squares: SquareContainer[][]
};

export default function BingoCard(props:BingoCardType) {
  const { columns, maxNumber, squares } = props;
  return (
    <>
      <div>
        列数：
        { columns }
      </div>
      {
        squares.map((line) => (
          <>
            {
              line.map((sq) => (
                <Square
                  squareNum={sq.squareNum}
                  isHit={sq.isHit}
                  numberLength={maxNumber.toString().length}
                />
              ))
            }
            <br />
          </>
        ))
      }
    </>
  );
}
