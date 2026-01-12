"use client";

import { LoginForm } from "@/components/forms/login-form";
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

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <ScaleIn duration={0.5}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {t("login.title")}
              </CardTitle>
              <CardDescription>{t("login.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <FadeInUp delay={0.2}>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">
                    {t("login.noAccount")}{" "}
                  </span>
                  <Link
                    href="/register"
                    className="underline underline-offset-4 hover:text-primary">
                    {t("login.registerLink")}
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
