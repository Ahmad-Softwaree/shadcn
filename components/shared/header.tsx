"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";
import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuroraText } from "../ui/aurora-text";

export function Header() {
  const { t } = useTranslation();
  return (
    <header className="border-b">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center justify-end gap-4">
          <LangToggle />
          <ThemeToggle />
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            asChild>
            <Link href="/">
              <Home />
            </Link>
          </Button>
        </div>
        {/* Shadcn text big nice */}
        <div className="flex justify-center mt-2">
          <h1 className="text-3xl font-bold">
            <AuroraText>{t("home.title")}</AuroraText>
          </h1>
        </div>
      </div>
    </header>
  );
}
