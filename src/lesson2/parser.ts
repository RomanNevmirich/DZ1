import {
  isNumber,
  isOpenBracket,
  isCloseBracket,
  isFactorial,
} from "./helpers";
import { mathOperators } from "./mathOperators";

export type ParsedLineType = (number | string)[];

const GetBracketEnd = (stack: string[], position: number): number => {
  let bcount = 1;
  let ob: number;
  let cb = -1;
  let m = position;
  while (bcount > 0 && m > -1) {
    ob = stack.indexOf("(", m + 1);
    cb = stack.indexOf(")", m + 1);
    if (cb == -1) throw new TypeError("Parse fail");
    else {
      bcount = bcount + (ob < cb && ob > 0 ? 1 : -1);
      m = ob < cb && ob > 0 ? ob : cb;
    }
  }
  return cb;
};

export const parser = (line: string): ParsedLineType | null => {
  const stack = line.replace("**", "^ 2").split(" ");

  return stack.reduce<ParsedLineType>((result, item, key) => {
    const prevItem = stack[key - 1];

    const isValidFactorialPush =
      isFactorial(item) &&
      (prevItem == undefined ||
        (mathOperators.hasOwnProperty(prevItem) && !isFactorial(prevItem)));
    const isValidNumberPush = !isNumber(prevItem) && isNumber(item);
    const isValidOperatorPush =
      (isNumber(prevItem) || isCloseBracket(prevItem)) &&
      !isNumber(item) &&
      mathOperators.hasOwnProperty(item) &&
      !isFactorial(item);

    if (isOpenBracket(item)) {
      const bE = GetBracketEnd(stack, key);
      result.push(stack.slice(key + 1, bE).join(" "));
      stack.splice(key, bE - key);
    } else if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush || isValidFactorialPush) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);
};
