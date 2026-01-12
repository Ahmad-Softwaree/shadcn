"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  FadeInUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animate";
import { useTranslation } from "react-i18next";
import { AuroraText } from "@/components/ui/aurora-text";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <StaggerContainer className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <StaggerItem>
            <ScaleIn duration={0.6}>
              <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
                <AuroraText>{t("home.title")}</AuroraText>
              </h1>
            </ScaleIn>
          </StaggerItem>

          <StaggerItem>
            <FadeInUp delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                {t("home.description")}
              </p>
            </FadeInUp>
          </StaggerItem>

          <StaggerItem>
            <FadeIn delay={0.4}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">{t("home.login")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/register">{t("home.register")}</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/dashboard">{t("home.dashboard")}</Link>
                </Button>
              </div>
            </FadeIn>
          </StaggerItem>
        </div>
      </StaggerContainer>
    </div>
  );
}
