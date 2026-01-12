"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUserValidation,
  type UserValidation,
} from "@/validation/user.validation";
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

interface UserFormProps {
  state: "insert" | "update";
}

export function UserForm({ state }: UserFormProps) {
  const { t } = useTranslation();
  const { modalData, closeModal } = useModalStore();

  const form = useForm<UserValidation>({
    resolver: zodResolver(getUserValidation(t)),
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

  const onSubmit = (data: UserValidation) => {
    console.log("User data:", data);
    toast.success(
      state === "insert" ? t("users.createSuccess") : t("users.updateSuccess")
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
              <FormLabel>{t("users.name")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("users.namePlaceholder")} />
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
              <FormLabel>{t("users.username")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("users.usernamePlaceholder")}
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
              <FormLabel>{t("users.email")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder={t("users.emailPlaceholder")}
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
              <FormLabel>{t("users.phone")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t("users.phonePlaceholder")} />
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
              <FormLabel>{t("users.dateOfBirth")}</FormLabel>
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
