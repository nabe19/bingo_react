import React, { useContext } from 'react';
import { maxNumberContext } from './App';

export type SquareType = {
  squareNum: number,
  isHit: boolean,
};

const Square: React.FunctionComponent<SquareType> = ({ squareNum, isHit }) => {
  const getZeroPaddingNum = (length: number): string => (Array(length).join('0') + squareNum).slice(-length);

  if (squareNum === 0) {
    return (('FREE'));
  }
  if (isHit) {
    return (`(${getZeroPaddingNum(useContext(maxNumberContext).toString().length)})`);
  }
  return (` ${getZeroPaddingNum(useContext(maxNumberContext).toString().length)} `);
};

export default Square;
