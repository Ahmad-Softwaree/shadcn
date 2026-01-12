import { z } from "zod";
import { TFunction } from "i18next";

export const getEmployeeValidation = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t("validation.nameMin")),
    username: z.string().min(3, t("validation.usernameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    phone: z.string().min(10, t("validation.phoneMin")),
    dateOfBirth: z.string().min(1, t("validation.dateOfBirthRequired")),
  });

export type EmployeeValidation = z.infer<
  ReturnType<typeof getEmployeeValidation>
>;
