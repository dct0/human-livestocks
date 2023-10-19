import { z } from "zod";

export const envSchema = z.object({
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  BOT_TOKEN: z.string(),
  API_PORT: z.string().default("4000").transform(Number),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type EnvSchema = z.infer<typeof envSchema>;
