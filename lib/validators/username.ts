import { z } from "zod";

export const usernameValidatar = z.object({
  name: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
});

export type UsernameRequest = z.infer<typeof usernameValidatar>;
