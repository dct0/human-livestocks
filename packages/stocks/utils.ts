import { Decimal } from "decimal.js";
import { REVERSION_FACTOR } from "./constants";
import { type HasPrice } from "./types";

export const calculateAverage = (stocks: HasPrice[]): Decimal => {
  return stocks
    .reduce((acc, curr) => acc.add(curr.price), new Decimal(0))
    .div(stocks.length);
};

export const calculateBias = (score: Decimal, deviation: Decimal): Decimal => {
  const biasStrength = Decimal.div(1, deviation.abs().add(1));
  return score.mul(biasStrength);
};

export const calculateReversion = (
  deviation: Decimal,
  reversionFactor: Decimal.Value
): Decimal => {
  return deviation.mul(reversionFactor);
};

export const calculateNewRate = (
  pastStocks: HasPrice[],
  score: Decimal
): Decimal => {
  const average = calculateAverage(pastStocks);
  const deviation = score.sub(average);

  const reversionAmount = calculateReversion(deviation, REVERSION_FACTOR);
  const biasAmount = calculateBias(score, deviation);

  const newRate = reversionAmount.add(biasAmount);

  return newRate;
};
