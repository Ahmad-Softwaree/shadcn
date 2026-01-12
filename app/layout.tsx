import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import LanguageProvider from "@/providers/language-provider";
import { ModalManager } from "@/components/shared/ModalManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn - Shadcn UI Showcase",
  description: "A beautiful showcase of Shadcn UI components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">{children}</div>
            <Toaster />
            <ModalManager />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
