export function getNewNumber(
  array: number[],
  min:number,
  max: number,
):number {
  const rand = (): number => (
    Math.floor(Math.random() * (max - min + 1) + min)
  );

  for (let num:number = rand(); ; num = rand()) {
    if ((Array.isArray(array) && array.length === 0)
                || (Array.isArray(array) && !array.includes(num))) {
      return num;
    }
  }
}

// https://qiita.com/butchi_y/items/db3078dced4592872a9c
export function generate2DArray(
  m: number,
  n: number,
  val: number | boolean,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
) { return [...Array(m)].map((_) => Array(n).fill(val)); }

// https://qiita.com/kznrluk/items/790f1b154d1b6d4de398
export function transpose(arr: boolean[][]) {
  if (arr.length <= 0) return arr;
  return arr[0].map((_, c) => arr.map((r) => r[c]));
}

export function rangeNumRecord(
  maxNumber: number,
  columns: number,
):number { return Math.ceil(maxNumber / columns); }
