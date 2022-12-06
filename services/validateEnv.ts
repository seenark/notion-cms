import { z } from "zod";

export const EnvSchema = z.object({
  NOTION_ACCESS_TOKEN: z.string(),
  NOTION_BLOG_DATABASE_ID: z.string(),
});

export type TEnv = z.infer<typeof EnvSchema>;

export function validateEnv() {
  const env = EnvSchema.parse(process.env);
  return env;
}
