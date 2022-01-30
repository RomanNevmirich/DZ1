import { ParsedLineType, parser } from "./parser";
import { mathOperators } from "./mathOperators";

import { lastPrioritiesCalc, priorityCalc } from "./engine";

const ResolveStack = (stack: ParsedLineType): number => {
  const firstPrioritiesRes = priorityCalc(stack, 1);
  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  return lastPrioritiesCalc(
    priorityCalc(priorityCalc(firstPrioritiesRes, 2), 3)
  );
};

export const runner = (line: string): number => {
  const stack = parser(line);

  if (stack === null) {
    throw new TypeError("Unexpected string");
  }

  stack.forEach(function (element, i) {
    if (!(mathOperators.hasOwnProperty(element) || !isNaN(Number(element)))) {
      //Calc if expression
      stack[i] = runner(String(element));
    }
  });

  return ResolveStack(stack);
};
