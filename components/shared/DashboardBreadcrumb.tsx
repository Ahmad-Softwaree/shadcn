"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ENUMs } from "@/lib/enums";

export function DashboardBreadcrumb() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  // Map path segments to translation keys
  const getTranslationKey = (segment: string) => {
    const keyMap: Record<string, string> = {
      dashboard: "dashboard.title",
      users: "sidebar.users",
      employees: "sidebar.employees",
      accounts: "sidebar.accounts",
      teams: "sidebar.teams",
      settings: "sidebar.settings",
      profile: "sidebar.profile",
    };
    return keyMap[segment] || segment;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <div key={segment} className="flex items-center gap-2">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {t(getTranslationKey(segment) as any)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {t(getTranslationKey(segment) as any)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
