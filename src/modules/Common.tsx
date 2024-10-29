import SquareContainer from './SquareContainer';

export default class Common {
  static rand = (min: number, max: number): number => (
    Math.floor(Math.random() * (max - min + 1) + min)
  );

  static findNumberIndex = (
    array: number[] | SquareContainer[],
    target: number,
  ):number => array.findIndex((element) => {
    if (SquareContainer.isSquare(element)) {
      return element.squareNum === target;
    }
    return element === target;
  });

  static getNewNumber = (
    array: Set<number> | number[] | SquareContainer[],
    min:number,
    max: number,
  ):number => {
    for (let num:number = Common.rand(min, max); ; num = Common.rand(min, max)) {
      if ((array instanceof Set && !array.has(num))
                || (Array.isArray(array) && array.length === 0)
                || (Array.isArray(array) && Common.findNumberIndex(array, num) === -1)) {
        return num;
      }
    }
  };
}
