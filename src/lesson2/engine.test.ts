import { priorityCalc, lastPrioritiesCalc } from "./engine";
describe("FirstPrioritiesCalc cases", () => {
  it("8, ^, 3]", () => {
    expect(priorityCalc([8, "^", 3], 1)).toEqual([512]);
  });
});
describe("secondPrioritiesCalc cases", () => {
  it("[!, 5]", () => {
    expect(priorityCalc(["!", 5], 2)).toEqual([120]);
  });
});

describe("thirdPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(priorityCalc([1, "*", 32], 3)).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(priorityCalc([32, "/", 32], 3)).toEqual([1]);
  });

  it("[32, + 32]", () => {
    expect(priorityCalc([32, "+", 32], 3)).toEqual([32, "+", 32]);
  });
});

describe("3PrioritiesCalc mixed with 4 priorities cases", () => {
  it("[32, /, 32, +, 10, *, 10]", () => {
    expect(priorityCalc([32, "/", 32, "+", 10, "*", 10], 3)).toEqual([
      1,
      "+",
      100,
    ]);
  });
});

describe("fourthPrioritiesCalc invalid cases", () => {
  it("[32, / 32]", () => {
    expect(() => lastPrioritiesCalc([32, "/", 32])).toThrow(
      TypeError("Unexpected stack!")
    );
  });
});

describe("fourthPrioritiesCalc simple cases", () => {
  it("[32, + 32]", () => {
    expect(lastPrioritiesCalc([32, "+", 32])).toEqual(64);
  });

  it("[32, - 32]", () => {
    expect(lastPrioritiesCalc([32, "-", 32])).toEqual(0);
  });

  it("[32, - 32, +, 10]", () => {
    expect(lastPrioritiesCalc([32, "-", 32, "+", 10])).toEqual(10);
  });
});
