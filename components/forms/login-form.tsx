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
import { getLoginSchema, type LoginInput } from "@/validation/login.validation";

export function LoginForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginInput) {
    // Simulate form submission
    if (values.username && values.password) {
      toast.success(t("toast.loginSuccess"), {
        description: t("toast.loginSuccessDescription"),
      });
    } else {
      toast.error(t("toast.loginError"), {
        description: t("toast.loginErrorDescription"),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.username")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("login.usernamePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("login.usernameHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("login.password")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
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
              <FormDescription>{t("login.passwordHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("login.submit")}
        </Button>
      </form>
    </Form>
  );
}
