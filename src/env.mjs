import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  server: {
    IRACING_EMAIL: z.string().min(1).email(),
    IRACING_PASSWORD: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  },
  runtimeEnv: process.env,
});
