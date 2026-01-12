"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getTeamValidation,
  type TeamValidation,
} from "@/validation/team.validation";
import { useTranslation } from "react-i18next";
import { useModalStore } from "@/lib/store/modal.store";
import { toast } from "sonner";
import { employees } from "@/lib/data/employees";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TeamFormProps {
  state: "insert" | "update";
}

export function TeamForm({ state }: TeamFormProps) {
  const { t } = useTranslation();
  const { modalData, closeModal } = useModalStore();

  const form = useForm<TeamValidation>({
    resolver: zodResolver(getTeamValidation(t)),
    defaultValues:
      state === "update" && modalData
        ? {
            name: modalData.name || "",
            employeeIds: modalData.employeeIds || [],
          }
        : {
            name: "",
            employeeIds: [],
          },
  });

  const onSubmit = (data: TeamValidation) => {
    console.log("Team data:", data);
    toast.success(
      state === "insert" ? t("teams.createSuccess") : t("teams.updateSuccess")
    );
    closeModal();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("teams.name")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("teams.namePlaceholder")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeIds"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>{t("teams.employees")}</FormLabel>
                <FormDescription>
                  {t("teams.employeesDescription")}
                </FormDescription>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {employees.map((employee) => (
                  <FormField
                    key={employee.id}
                    control={form.control}
                    name="employeeIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={employee.id}
                          className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(employee.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      employee.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== employee.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {employee.name} ({employee.username})
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={closeModal}>
            {t("common.cancel")}
          </Button>
          <Button type="submit">
            {state === "insert" ? t("common.create") : t("common.update")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
