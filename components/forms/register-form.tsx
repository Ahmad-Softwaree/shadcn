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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff, CalendarIcon, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
      accountType: "personal",
      companyName: "",
      numberOfEmployees: undefined,
      dateOfBirth: undefined,
      termsAccepted: false,
    },
  });

  const accountType = form.watch("accountType");

  function onSubmit(values: RegisterInput) {
    // Simulate form submission
    if (
      values.name &&
      values.username &&
      values.email &&
      values.password &&
      values.termsAccepted
    ) {
      toast.success(t("toast.registerSuccess"), {
        description: t("toast.registerSuccessDescription"),
      });
    } else {
      toast.error(t("toast.registerError"), {
        description: t("toast.registerErrorDescription"),
      });
    }
  }

  const handleOAuthRegister = (provider: string) => {
    toast.info(t("toast.oauthRegister", { provider }), {
      description: t("toast.oauthRegisterDescription", { provider }),
    });
  };

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
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("register.accountType")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("register.accountTypePlaceholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="personal">
                    {t("register.accountTypePersonal")}
                  </SelectItem>
                  <SelectItem value="company">
                    {t("register.accountTypeCompany")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {t("register.accountTypeHelper")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {accountType === "company" && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register.companyName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("register.companyNamePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("register.companyNameHelper")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register.numberOfEmployees")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("register.numberOfEmployeesPlaceholder")}
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    {t("register.numberOfEmployeesHelper")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("register.dateOfBirth")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}>
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{t("register.dateOfBirthPlaceholder")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                {t("register.dateOfBirthHelper")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("register.termsAccepted")}</FormLabel>
                <FormDescription>
                  {t("register.termsAcceptedHelper")}
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("register.submit")}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("register.orContinueWith")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthRegister("Gmail")}
            className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("login.loginWithGmail")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOAuthRegister("GitHub")}
            className="w-full">
            <Github />
            {t("login.loginWithGithub")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
