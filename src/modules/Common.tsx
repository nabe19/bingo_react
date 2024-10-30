export default class Common {
  static rand = (min: number, max: number): number => (
    Math.floor(Math.random() * (max - min + 1) + min)
  );

  static getNewNumber = (
    array: number[],
    min:number,
    max: number,
  ):number => {
    for (let num:number = Common.rand(min, max); ; num = Common.rand(min, max)) {
      if ((Array.isArray(array) && array.length === 0)
                || (Array.isArray(array) && !array.includes(num))) {
        return num;
      }
    }
  };
}
