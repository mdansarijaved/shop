import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string(),
    CLOUDFLARE_URL: z.string().url(),
    CLOUDFLARE_ACCESS_KEY: z.string().min(3),
    CLOUDFLARE_ACCESS_ID: z.string().min(3),
    CLOUDFLARE_BUCKET_NAME: z.string().min(3),
    CLOUDFLARE_PUBLIC_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDFLARE_URL: process.env.CLOUDFLARE_URL,
    CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
    CLOUDFLARE_ACCESS_ID: process.env.CLOUDFLARE_ACCESS_ID,
    CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,
    CLOUDFLARE_PUBLIC_URL: process.env.CLOUDFLARE_PUBLIC_URL,
    NODE_ENV:
      process.env.NODE_ENV === "development" ? "development" : "production",
  },
  emptyStringAsUndefined: true,
});
