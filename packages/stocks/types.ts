import { type StockPrice } from "db";
import { type SetRequired } from "type-fest";

export type HasPrice = SetRequired<Partial<StockPrice>, "price">;
