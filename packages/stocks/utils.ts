import { Decimal } from "decimal.js";
import { REVERSION_FACTOR } from "./constants";
import { type HasPrice } from "./types";

export const calculateAverage = (decimalList: Decimal[]): Decimal => {
  return decimalList
    .reduce((acc, curr) => acc.add(curr), new Decimal(0))
    .div(decimalList.length);
};

export const calculateRMS = (decimalList: Decimal[]): Decimal => {
  const average = calculateAverage(decimalList);
  const squaredDifferences = decimalList.map((decimal) =>
    decimal.sub(average).pow(2)
  );
  const averageSquaredDifference = calculateAverage(squaredDifferences);
  return averageSquaredDifference.sqrt();
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
  scores: Decimal[]
): Decimal => {
  if (!pastStocks.length || !scores.length) {
    return new Decimal(NaN);
  }
  const stockPriceAverage = calculateAverage(
    pastStocks.map((stock) => stock.price)
  );
  // const averageScore = calculateAverage(scores);

  // weight the deviation by the volatility of the scores
  const rmsScore = calculateRMS(scores);

  const deviation = rmsScore.sub(stockPriceAverage);

  const reversionAmount = calculateReversion(deviation, REVERSION_FACTOR);
  const biasAmount = calculateBias(rmsScore, deviation);

  const newRate = reversionAmount.add(biasAmount);

  return newRate;
};
