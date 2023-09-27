import { Decimal } from "@prisma/client/runtime/library";

export const calculateBias = (score: Decimal, deviation: Decimal) => {
  const biasStrength = Decimal.div(1, deviation.abs().add(1));
  return score.mul(biasStrength);
};
