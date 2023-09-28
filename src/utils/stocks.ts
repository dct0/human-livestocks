import { REVERSION_FACTOR } from "../constants/stocks";
import { type HasPrice } from "../types/stocks";

import { Decimal } from "@prisma/client/runtime/library";

export const calculateAverage = (stocks: HasPrice[]) => {
  return stocks
    .reduce((acc, curr) => acc.add(curr.price), new Decimal(0))
    .div(stocks.length);
};

export const calculateBias = (score: Decimal, deviation: Decimal) => {
  const biasStrength = Decimal.div(1, deviation.abs().add(1));
  return score.mul(biasStrength);
};

export const calculateReversion = (
  deviation: Decimal,
  reversionFactor: Decimal.Value,
) => {
  return deviation.mul(reversionFactor);
};

export const calculateNewRate = (pastStocks: HasPrice[], score: Decimal) => {
  const average = calculateAverage(pastStocks);
  const deviation = score.sub(average);

  const reversionAmount = calculateReversion(deviation, REVERSION_FACTOR);
  const biasAmount = calculateBias(score, deviation);

  const newRate = reversionAmount.add(biasAmount);

  return newRate;
};
