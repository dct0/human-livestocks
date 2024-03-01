import { Decimal } from "decimal.js";
import { beforeEach, describe, expect, it } from "vitest";
import { steampotStocks } from "../../data/stocks";
import { calculateAverage, calculateBias, calculateNewRate } from "../../utils";

describe("Stocks", () => {
  let scores: Decimal[];

  beforeEach(() => {
    scores = [3.14, -0.23, 6.87, 4.56, -2.34, 2.15, 9.21, 8.12, -0.62].map(
      (score) => new Decimal(score),
    );
  });

  it("should calculate the average of the supplied stock prices", () => {
    expect(
      calculateAverage(steampotStocks.map((s) => s.price)).toNumber(),
    ).toBe(0.7459608390689286);
  });

  it("should calculate the bias of the supplied score and deviation", () => {
    expect(calculateBias(new Decimal(0.5), new Decimal(0.5)).toNumber()).toBe(
      1 / 3,
    );
  });

  it("should calculate the new rate given the supplied past stocks and score", () => {
    expect(calculateNewRate(steampotStocks, scores).toPrecision(3)).toBe(
      "2.60",
    );
  });
});
