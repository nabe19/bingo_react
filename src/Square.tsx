export type SquareType = {
  squareNum: number,
  isHit: boolean,
  numLength: number,
};

export function Square(props: SquareType) {
  const { squareNum, isHit, numLength } = props;
  const getZeroPaddingNum = (length: number): string => (Array(length).join('0') + squareNum).slice(-length);

  if (squareNum === 0) {
    return (('FREE'));
  }
  if (isHit) {
    return (`(${getZeroPaddingNum(numLength)})`);
  }
  return (` ${getZeroPaddingNum(numLength)} `);
}
