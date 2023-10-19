import { calculateAverage, calculateBias, calculateNewRate } from "../../utils";
import { type HasPrice } from "../../types";

import { Decimal } from "db/client/runtime/library";
import { beforeEach, describe, expect, it } from "vitest";

describe("Stocks", () => {
  let pastStocks: HasPrice[];

  beforeEach(() => {
    pastStocks = [
      0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25, 0.75, 0.5,
      0.25, 0.75, 0.5, 0.25, 0.75, 0.5, 0.25,
    ].map((price) => ({
      price: new Decimal(price),
    }));
  });

  it("should calculate the average of the supplied stock prices", () => {
    expect(calculateAverage(pastStocks).toNumber()).toBe(0.4875);
  });

  it("should calculate the bias of the supplied score and deviation", () => {
    expect(calculateBias(new Decimal(0.5), new Decimal(0.5)).toNumber()).toBe(
      1 / 3
    );
  });

  it("should calculate the new rate given the supplied past stocks and score", () => {
    expect(calculateNewRate(pastStocks, new Decimal(0.5)).toPrecision(3)).toBe(
      "0.495"
    );
  });
});
