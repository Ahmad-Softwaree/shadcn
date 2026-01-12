"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getSettingsValidation,
  type SettingsValidation,
} from "@/validation/settings.validation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { FadeInUp } from "@/components/shared/animate";

export default function SettingsPage() {
  const { t } = useTranslation();

  const form = useForm<SettingsValidation>({
    resolver: zodResolver(getSettingsValidation(t)),
    defaultValues: {
      siteName: "Shadcn Dashboard",
      siteEmail: "admin@shadcn.com",
      enableNotifications: true,
      enableEmailAlerts: false,
      language: "en",
      timezone: "UTC",
    },
  });

  const onSubmit = (data: SettingsValidation) => {
    console.log("Settings data:", data);
    toast.success(t("settings.updateSuccess"));
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6">
      <FadeInUp>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            {t("settings.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("settings.description")}
          </p>
        </div>
      </FadeInUp>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FadeInUp delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.general.title")}</CardTitle>
                <CardDescription>
                  {t("settings.general.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("settings.siteName")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={t("settings.siteNamePlaceholder")}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("settings.siteNameDescription")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="siteEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("settings.siteEmail")}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder={t("settings.siteEmailPlaceholder")}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("settings.siteEmailDescription")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("settings.language")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("settings.languagePlaceholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="ckb">کوردی</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {t("settings.languageDescription")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("settings.timezone")}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t("settings.timezonePlaceholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">
                            Eastern Time
                          </SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Asia/Baghdad">Baghdad</SelectItem>
                          <SelectItem value="Asia/Dubai">Dubai</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {t("settings.timezoneDescription")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.notifications.title")}</CardTitle>
                <CardDescription>
                  {t("settings.notifications.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          {t("settings.enableNotifications")}
                        </FormLabel>
                        <FormDescription>
                          {t("settings.enableNotificationsDescription")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableEmailAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("settings.enableEmailAlerts")}</FormLabel>
                        <FormDescription>
                          {t("settings.enableEmailAlertsDescription")}
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="gap-2">
                <Save className="w-5 h-5" />
                {t("common.save")}
              </Button>
            </div>
          </FadeInUp>
        </form>
      </Form>
    </div>
  );
}
