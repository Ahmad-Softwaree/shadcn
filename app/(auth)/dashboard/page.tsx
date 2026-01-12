"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/animate";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <StaggerContainer>
        <StaggerItem>
          <FadeInUp>
            <h1 className="text-4xl font-bold mb-8">{t("dashboard.title")}</h1>
          </FadeInUp>
        </StaggerItem>

        <StaggerItem>
          <FadeInUp delay={0.2}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.card1Title")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.card1Description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.card2Title")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.card2Description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.card3Title")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.card3Description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">0</p>
                </CardContent>
              </Card>
            </div>
          </FadeInUp>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
