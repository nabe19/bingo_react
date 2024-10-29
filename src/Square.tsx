import React from 'react';

export type SquareType = {
  squareNum: number,
  isHit: boolean,
  numberLength: number
};

const Square: React.FunctionComponent<SquareType> = ({ squareNum, isHit, numberLength }) => {
  const getZeroPaddingNum = (length: number): string => (Array(length).join('0') + squareNum).slice(-length);

  if (squareNum === 0) {
    return (('FREE'));
  }
  if (isHit) {
    return (`(${getZeroPaddingNum(numberLength)})`);
  }
  return (` ${getZeroPaddingNum(numberLength)} `);
};

export default Square;
