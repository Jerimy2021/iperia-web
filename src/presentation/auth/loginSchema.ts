import { z } from "zod";
import { es } from "@shared/i18n/es";

export const loginSchema = z.object({
  email: z.email(es.auth.login.invalidEmail),
  password: z.string().min(1, es.common.requiredField),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
