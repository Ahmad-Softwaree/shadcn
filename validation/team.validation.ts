import { z } from "zod";
import { TFunction } from "i18next";

export const getTeamValidation = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t("validation.nameMin")),
    employeeIds: z.array(z.number()).min(1, t("validation.teamEmployeesMin")),
  });

export type TeamValidation = z.infer<ReturnType<typeof getTeamValidation>>;
