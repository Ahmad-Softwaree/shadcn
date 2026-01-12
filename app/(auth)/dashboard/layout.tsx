"use client";

import { Sidebar } from "@/components/shared/Sidebar";
import { DashboardBreadcrumb } from "@/components/shared/DashboardBreadcrumb";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="p-0 ">
        <Header />

        <div className="min-h-screen px-5 md:px-10">
          <div className="mb-6 flex items-center gap-2">
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </div>
          {children}
        </div>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
