import { z } from "zod";
import type { i18n as I18nType } from "i18next";

export const getRegisterSchema = (t: I18nType["t"]) =>
  z
    .object({
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
      accountType: z.enum(["personal", "company"], {
        message: t("validation.accountTypeRequired"),
      }),
      companyName: z.string().optional(),
      numberOfEmployees: z.number().optional(),
      dateOfBirth: z.date({
        message: t("validation.dateOfBirthRequired"),
      }),
      termsAccepted: z.boolean().refine((val) => val === true, {
        message: t("validation.termsRequired"),
      }),
    })
    .refine(
      (data) => {
        if (data.accountType === "company") {
          return !!data.companyName && data.companyName.length >= 2;
        }
        return true;
      },
      {
        message: t("validation.companyNameRequired"),
        path: ["companyName"],
      }
    )
    .refine(
      (data) => {
        if (data.accountType === "company") {
          return (
            data.numberOfEmployees !== undefined && data.numberOfEmployees > 0
          );
        }
        return true;
      },
      {
        message: t("validation.numberOfEmployeesRequired"),
        path: ["numberOfEmployees"],
      }
    );

export type RegisterInput = z.infer<ReturnType<typeof getRegisterSchema>>;
