import React from 'react';
import Square from './Square';

type BingoCardType = {
  columns: number,
  squares: number[][],
  hitSquares: boolean[][],
};

export default function BingoCard(props:BingoCardType) {
  const {
    columns, squares, hitSquares,
  } = props;

  // const isHit = (num: number): boolean => balls.includes(num);

  return (
    <>
      <div>
        列数：
        { columns }
      </div>
      {
        squares.map((line, verIndex) => (
          <div
            key={line.join('')}
          >
            {
              line.map((num, horIndex) => (
                <Square
                  key={num}
                  squareNum={num}
                  isHit={hitSquares[verIndex][horIndex]}
                />
              ))
            }
            <br />
          </div>
        ))
      }
    </>
  );
}
