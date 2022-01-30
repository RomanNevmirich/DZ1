export const isNumber = (item: string): boolean => !isNaN(Number(item));
export const isOpenBracket = (item: string): boolean => item == "(";
export const isCloseBracket = (item: string): boolean => item == ")";
export const isFactorial = (item: string): boolean => item == "!";
