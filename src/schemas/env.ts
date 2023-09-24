/* eslint-disable @typescript-eslint/naming-convention */
import z from "zod";

export const envSchema = z.object({
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  BOT_TOKEN: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export type EnvSchema = z.infer<typeof envSchema>;
