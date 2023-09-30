import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  server: {
    IRACING_EMAIL: z.string().min(1).email(),
    IRACING_PASSWORD: z.string().min(1),
    API_URL: z.string().min(1).url(),
    // NEXT_AUTH_SECRET: z.string(),
    // GITHUB_ID: z.string(),
    // GITHUB_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  },
  runtimeEnv: process.env,
});
