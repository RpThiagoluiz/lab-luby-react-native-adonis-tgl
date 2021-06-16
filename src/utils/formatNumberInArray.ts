export const formatNumberInArray = (selectedNumber: string) => {
  const crescs = (cr1: any, cr2: any) => {
    return cr1 - cr2;
  };
  const formateNumbers = (numbers: string[]) => numbers.join(", ");

  let crescResult = selectedNumber.replace(/['"]+/g, "").split(", ");
  //crescResult = formateNumbers(crescResult)

  const numberResult = crescResult.sort(crescs);

  return;
  return numberResult;
};

export const numArray = (numbers: any) =>
  numbers.sort((a: any, b: any) => a - b);
