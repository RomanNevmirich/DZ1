import { parser } from "./parser";

describe("Parser brackets", () => {
  it("( 12 + ( 1 + ( 2 - 3 ) * 4 ) + ( 5 * 6 ) ) + 12 * ( 2 + 1 )", () => {
    expect(
      parser("( 12 + ( 1 + ( 2 - 3 ) * 4 ) + ( 5 * 6 ) ) + 12 * ( 2 + 1 )")
    ).toEqual([
      "12 + ( 1 + ( 2 - 3 ) * 4 ) + ( 5 * 6 )",
      "+",
      12,
      "*",
      "2 + 1",
    ]);
  });
});

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, "+", 32]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
  });

  it("3 ^ 5 + 11 - 12 * 22", () => {
    expect(parser("3 ^ 5 + 11 - 12 * 22")).toEqual([
      3,
      "^",
      5,
      "+",
      11,
      "-",
      12,
      "*",
      22,
    ]);
  });
  it("2 **", () => {
    expect(parser("2 **")).toEqual([2, "^", 2]);
  });
  it("1 + ! 33 - 2", () => {
    expect(parser("1 + ! 33 - 2")).toEqual([1, "+", "!", 33, "-", 2]);
  });
  it("! 10", () => {
    expect(parser("! 10")).toEqual(["!", 10]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });
  it("! ! 10", () => {
    expect(() => parser("! ! 10")).toThrow(TypeError("Unexpected string"));
  });
  it("+ ! 10", () => {
    expect(() => parser("+ ! 10")).toThrow(TypeError("Unexpected string"));
  });
});
