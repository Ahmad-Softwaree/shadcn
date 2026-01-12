"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Briefcase,
  UsersRound,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { ENUMs } from "@/lib/enums";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data/profile";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const sidebarLinks = [
  {
    href: ENUMs.PAGES.DASHBOARD,
    label: "dashboard.title",
    icon: LayoutDashboard,
  },
  {
    href: `${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.USERS}`,
    label: "sidebar.users",
    icon: Users,
  },
  {
    href: `${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.EMPLOYEES}`,
    label: "sidebar.employees",
    icon: UserCog,
  },
  {
    href: `${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.ACCOUNTS}`,
    label: "sidebar.accounts",
    icon: Briefcase,
  },
  {
    href: `${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.TEAMS}`,
    label: "sidebar.teams",
    icon: UsersRound,
  },
  {
    href: `${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.SETTINGS}`,
    label: "sidebar.settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push(ENUMs.PAGES.HOME);
  };

  const handleProfileClick = () => {
    router.push(`${ENUMs.PAGES.DASHBOARD}${ENUMs.PAGES.PROFILE}`);
  };

  // Determine if RTL based on current language
  const isRTL = i18n.language === "ar" || i18n.language === "ckb";
  const sidePosition = isRTL ? "right" : "left";

  return (
    <ShadcnSidebar side={sidePosition} collapsible="icon">
      {/* Logo/Brand */}
      <SidebarHeader>
        <div className="px-2 py-2">
          <h2 className="english_font text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            {t("home.title")}
          </h2>
        </div>
      </SidebarHeader>

      {/* Navigation Links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={t(link.label as any)}>
                      <Link href={link.href}>
                        <Icon />
                        <span>{t(link.label as any)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Section */}
      <SidebarFooter>
        {/* Profile Button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t("sidebar.profile")} size="lg">
              <button onClick={handleProfileClick} className="w-full">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{profile.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("sidebar.profile")}
                  </span>
                </div>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Logout Button */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t("sidebar.logout")}>
              <button onClick={handleLogout} className="w-full">
                <LogOut />
                <span>{t("sidebar.logout")}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
