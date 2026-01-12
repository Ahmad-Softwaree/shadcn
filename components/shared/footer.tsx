"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            {t("footer.builtBy")}{" "}
            <Link
              href="https://www.ahmad-software.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium english_font underline underline-offset-4 hover:text-foreground">
              Ahmad Software
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Ahmad-Softwaree"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.ahmad-software.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="english_font text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
