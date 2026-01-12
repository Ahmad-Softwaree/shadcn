import { z } from "zod";
import type { i18n as I18nType } from "i18next";

export const getRegisterSchema = (t: I18nType["t"]) =>
  z.object({
    name: z.string().min(2, {
      message: t("validation.nameMin"),
    }),
    username: z.string().min(3, {
      message: t("validation.usernameMin"),
    }),
    email: z.string().email({
      message: t("validation.emailInvalid"),
    }),
    password: z.string().min(6, {
      message: t("validation.passwordMin"),
    }),
  });

export type RegisterInput = z.infer<ReturnType<typeof getRegisterSchema>>;
