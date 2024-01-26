import { Decimal } from "decimal.js";
import { beforeEach, describe, expect, it } from "vitest";
import { type HasPrice } from "../../types";
import { calculateAverage, calculateBias, calculateNewRate } from "../../utils";

// TODO: write tests?
describe.skip("Stocks", () => {
  let pastStocks: HasPrice[];
  let scores: Decimal[];

  beforeEach(() => {
    pastStocks = [
      0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5,
      0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25,
    ].map((price) => ({
      price: new Decimal(price),
    }));

    scores = [3.14, -1.23, 0.87, 4.56, -2.34, 2.15, 4.21, 8.12, -0.62].map(
      (score) => new Decimal(score),
    );
  });

  it("should calculate the average of the supplied stock prices", () => {
    expect(calculateAverage(pastStocks.map((s) => s.price)).toNumber()).toBe(
      0.4875,
    );
  });

  it("should calculate the bias of the supplied score and deviation", () => {
    expect(calculateBias(new Decimal(0.5), new Decimal(0.5)).toNumber()).toBe(
      1 / 3,
    );
  });

  it("should calculate the new rate given the supplied past stocks and score", () => {
    expect(calculateNewRate(pastStocks, scores).toPrecision(3)).toBe("0.495");
  });
});
