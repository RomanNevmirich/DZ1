import { runner } from "./runner";

describe("Brackets", () => {
  it("( 1 + 32 ) * ( 3 + 8 )", () => {
    expect(runner("( 1 + 32 ) * ( 3 + 8 )")).toEqual(363);
  });
});

describe("Runner simple cases", () => {
  it("1 * 32", () => {
    expect(runner("1 * 32")).toEqual(32);
  });

  it("2 * 32", () => {
    expect(runner("2 * 32")).toEqual(64);
  });

  it("2 + 32", () => {
    expect(runner("2 + 32")).toEqual(34);
  });
  it("2 ^ 10", () => {
    expect(runner("2 ^ 10")).toEqual(1024);
  });
  it("4 **", () => {
    expect(runner("4 **")).toEqual(16);
  });
  it("! 4", () => {
    expect(runner("! 4")).toEqual(24);
  });
});

describe("Runner tripled/mixed cases", () => {
  it("2 * 2 * 3", () => {
    expect(runner("2 * 2 * 3")).toEqual(12);
  });

  it("2 * 2 + 3", () => {
    expect(runner("2 * 2 + 3")).toEqual(7);
  });

  it("2 + 2 * 3", () => {
    expect(runner("2 + 2 * 3")).toEqual(8);
  });
});

describe("Runner long cases", () => {
  it("20 + 1 * 10 - 5 * 3", () => {
    expect(runner("20 + 1 * 10 - 5 * 3")).toEqual(15);
  });

  it("20 - 10 * 10 / 5 - 3", () => {
    expect(runner("20 - 10 * 10 / 5 - 3")).toEqual(-3);
  });

  it("2 ^ 3 + 4 ^ 2 * 2", () => {
    expect(runner("2 ^ 3 + 4 ^ 2 * 2")).toEqual(40);
  });

  it("( 2 ^ 3 + ( 1 + ( 2 - 3 ) * 2 ** ) + ( 5 * ! 3 ) ) + 12 * ( 2 + 1 )", () => {
    expect(
      runner(
        "( 2 ^ 3 + ( 1 + ( 2 - 3 ) * 2 ** ) + ( 5 * ! 3 ) ) + 12 * ( 2 + 1 )"
      )
    ).toEqual(71);
  });
});
