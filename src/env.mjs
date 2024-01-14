import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  server: {
    IRACING_EMAIL: z.string().min(1).email(),
    IRACING_PASSWORD: z.string().min(1),
    API_URL: z.string().min(1).url(),
    WS_URL: z.string().min(1).url(),
    // NEXT_AUTH_SECRET: z.string(),
    // GITHUB_ID: z.string(),
    // GITHUB_SECRET: z.string(),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    MAINTENANCE: z
      .string()
      .optional()
      .transform((v) => v === "true"),
  },
  client: {
    // NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    // NEXT_PUBLIC_POSTHOG_HOST: z.string(),
  },
  runtimeEnv: process.env,
});
