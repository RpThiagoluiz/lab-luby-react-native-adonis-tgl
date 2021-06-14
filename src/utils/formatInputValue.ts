export const inputFormatValue = (number: Number) => {
  return number < 10 ? `0${number}` : `${number}`;
};
