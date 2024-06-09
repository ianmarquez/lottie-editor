export const toRGBADecimal = (array: number[]) =>
  array.map((value, idx) =>
    idx != 3 && array[3] != 0 ? Math.round(value * 255) : value,
  );

export const toRGBADecimalGradient = (array: number[]) =>
  array.map((value, idx) => {
    if (idx != 0 && value % 4 == 0) {
      return value;
    } else {
      return Math.round(value * 255);
    }
  });
