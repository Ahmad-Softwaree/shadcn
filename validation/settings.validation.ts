import { z } from "zod";
import { TFunction } from "i18next";

export const getSettingsValidation = (t: TFunction) =>
  z.object({
    siteName: z.string().min(2, t("validation.nameMin")),
    siteEmail: z.string().email(t("validation.emailInvalid")),
    enableNotifications: z.boolean(),
    enableEmailAlerts: z.boolean(),
    language: z.string(),
    timezone: z.string(),
  });

export type SettingsValidation = z.infer<
  ReturnType<typeof getSettingsValidation>
>;
