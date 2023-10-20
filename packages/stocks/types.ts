import { type StockPrice } from "db/client";
import { type SetRequired } from "type-fest";

export type HasPrice = SetRequired<Partial<StockPrice>, "price">;
