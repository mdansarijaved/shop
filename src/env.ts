/* eslint-disable */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string(),
    IMAGEKIT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_IMAGEKIT_KEY: z.string(),
    NEXT_PUBLIC_IMGKIT_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_IMAGEKIT_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_KEY,
    NEXT_PUBLIC_IMGKIT_URL: process.env.NEXT_PUBLIC_IMGKIT_URL,
    IMAGEKIT_SECRET: process.env.IMAGEKIT_SECRET,
    NODE_ENV:
      process.env.NODE_ENV === "development" ? "development" : "production",
  },
  emptyStringAsUndefined: true,
});
