"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getEmployeeValidation,
  type EmployeeValidation,
} from "@/validation/employee.validation";
import { useTranslation } from "react-i18next";
import { useModalStore } from "@/lib/store/modal.store";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EmployeeFormProps {
  state: "insert" | "update";
}

export function EmployeeForm({ state }: EmployeeFormProps) {
  const { t } = useTranslation();
  const { modalData, closeModal } = useModalStore();

  const form = useForm<EmployeeValidation>({
    resolver: zodResolver(getEmployeeValidation(t)),
    defaultValues:
      state === "update" && modalData
        ? {
            name: modalData.name || "",
            username: modalData.username || "",
            email: modalData.email || "",
            phone: modalData.phone || "",
            dateOfBirth: modalData.dateOfBirth || "",
          }
        : {
            name: "",
            username: "",
            email: "",
            phone: "",
            dateOfBirth: "",
          },
  });

  const onSubmit = (data: EmployeeValidation) => {
    console.log("Employee data:", data);
    toast.success(
      state === "insert"
        ? t("employees.createSuccess")
        : t("employees.updateSuccess")
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
              <FormLabel>{t("employees.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("employees.namePlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.username")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("employees.usernamePlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("employees.emailPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.phone")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("employees.phonePlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("employees.dateOfBirth")}</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
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
