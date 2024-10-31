import React from 'react';
import { Square } from './Square';

type BingoCardType = {
  squares: number[][],
  hitSquares: boolean[][],
  maxNumber: number,
};

export default function BingoCard(props:BingoCardType) {
  const {
    squares, hitSquares, maxNumber,
  } = props;
  // const isHit = (num: number): boolean => balls.includes(num);

  return (
    <>
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
                  numLength={maxNumber.toString().length}
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
