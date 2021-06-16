export const formatNumberInArray = (selectedNumber: number[]) => {
  const crescs = (cr1: number, cr2: number) => {
    return cr1 - cr2;
  };

  const crescResult = [...selectedNumber];

  const numberResult = crescResult.sort(crescs);

  const formateNumbers = (numbers: number[]) => numbers.join(", ");

  return formateNumbers(numberResult);
};

export const numArray = (numbers: any) =>
  numbers.sort((a: any, b: any) => a - b);
