import { type StockPrice } from "@prisma/client";
import { type SetRequired } from "type-fest";

export type HasPrice = SetRequired<Partial<StockPrice>, "price">;
