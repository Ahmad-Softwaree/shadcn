"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  getRegisterSchema,
  type RegisterInput,
} from "@/validation/register.validation";

export function RegisterForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(getRegisterSchema(t)),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterInput) {
    // Simulate form submission
    if (values.name && values.username && values.email && values.password) {
      toast.success(t("toast.registerSuccess"), {
        description: t("toast.registerSuccessDescription"),
      });
    } else {
      toast.error(t("toast.registerError"), {
        description: t("toast.registerErrorDescription"),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("register.namePlaceholder")} {...field} />
              </FormControl>
              <FormDescription>{t("register.nameHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.username")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("register.usernamePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("register.usernameHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("register.emailPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("register.emailHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.password")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("register.passwordPlaceholder")}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription>{t("register.passwordHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("register.submit")}
        </Button>
      </form>
    </Form>
  );
}
