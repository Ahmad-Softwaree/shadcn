import { z } from "zod";
import type { i18n as I18nType } from "i18next";

export const getLoginSchema = (t: I18nType["t"]) =>
  z.object({
    username: z.string().min(3, {
      message: t("validation.usernameMin"),
    }),
    password: z.string().min(6, {
      message: t("validation.passwordMin"),
    }),
  });

export type LoginInput = z.infer<ReturnType<typeof getLoginSchema>>;
