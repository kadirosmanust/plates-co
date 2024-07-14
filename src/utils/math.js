export const floorAndFix = (num, precision = 2) =>
  (Math.floor(num * 10 ** precision) / 10 ** precision).toFixed(precision);
