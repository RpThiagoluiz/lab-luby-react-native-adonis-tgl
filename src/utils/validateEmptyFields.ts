const isEmptyName = (value: string) => value.trim().length >= 3;

const isEmptyEmail = (value: string) => value.trim() !== "";
const isValidRegex = (value: string) =>
  /^[\w+.]*@\w+.(?:[A-Z]{2,})?.[\w\w]*$/.test(value);
const isMinChars = (value: string) => value.trim().length >= 6;

export { isEmptyEmail, isEmptyName, isValidRegex, isMinChars };
