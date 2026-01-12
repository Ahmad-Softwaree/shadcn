import { z } from "zod";
import { TFunction } from "i18next";

export const getProfileValidation = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t("validation.nameMin")),
    username: z.string().min(3, t("validation.usernameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    dateOfBirth: z.string().optional(),
    image: z.union([z.string(), z.instanceof(File)]).optional(),
  });

export type ProfileValidation = z.infer<
  ReturnType<typeof getProfileValidation>
>;
