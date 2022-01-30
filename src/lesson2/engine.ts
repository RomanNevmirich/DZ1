import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
  mathOperatorsPostArg,
} from "./mathOperators";

const [FIRST, SECOND, THIRD, FOURTH] = mathPriorities;

export const priorityCalc = (
  stack: ParsedLineType,
  priority: number
): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === priority) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      const sliceCount = mathOperatorsPostArg[item] ? 1 : 2;
      const arg1 = mathOperatorsPostArg[item]
        ? Number(nextItem)
        : Number(prevItem);
      const arg2 = mathOperatorsPostArg[item] ? 0 : Number(nextItem);
      result = [
        ...result.slice(0, -sliceCount),
        mathOperators[item](arg1, arg2),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const lastPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (mathOperatorsPriorities[item] === THIRD) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FOURTH) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));
