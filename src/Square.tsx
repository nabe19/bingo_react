export type SquareType = {
  squareNum: number,
  isHit: boolean,
  numLength: number,
};

const Square: React.FunctionComponent<SquareType> = ({ squareNum, isHit, numLength }) => {
  const getZeroPaddingNum = (length: number): string => (Array(length).join('0') + squareNum).slice(-length);

  if (squareNum === 0) {
    return (('FREE'));
  }
  if (isHit) {
    return (`(${getZeroPaddingNum(numLength)})`);
  }
  return (` ${getZeroPaddingNum(numLength)} `);
};

export default Square;
