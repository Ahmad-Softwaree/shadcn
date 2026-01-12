"use client";

import { RegisterForm } from "@/components/forms/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeInUp, ScaleIn } from "@/components/shared/animate";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <ScaleIn duration={0.5}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {t("register.title")}
              </CardTitle>
              <CardDescription>{t("register.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <FadeInUp delay={0.2}>
                <RegisterForm />
                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">
                    {t("register.haveAccount")}{" "}
                  </span>
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary">
                    {t("register.loginLink")}
                  </Link>
                </div>
              </FadeInUp>
            </CardContent>
          </Card>
        </ScaleIn>
      </div>
    </div>
  );
}
