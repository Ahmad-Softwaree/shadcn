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
import { users } from "@/lib/data/users";
import { employees } from "@/lib/data/employees";
import { accounts } from "@/lib/data/accounts";
import { teams } from "@/lib/data/teams";
import { Users, UserCog, Briefcase, UsersRound } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const chartData = [
  { month: "Jan", users: 45, employees: 28, accounts: 12 },
  { month: "Feb", users: 52, employees: 32, accounts: 15 },
  { month: "Mar", users: 61, employees: 35, accounts: 18 },
  { month: "Apr", users: 58, employees: 38, accounts: 16 },
  { month: "May", users: 67, employees: 42, accounts: 20 },
  { month: "Jun", users: 72, employees: 45, accounts: 22 },
];

export default function DashboardPage() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("dashboard.totalUsers"),
      value: users.length,
      description: t("dashboard.totalUsersDesc"),
      icon: Users,
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: t("dashboard.totalEmployees"),
      value: employees.length,
      description: t("dashboard.totalEmployeesDesc"),
      icon: UserCog,
      gradient: "from-violet-600 to-indigo-600",
    },
    {
      title: t("dashboard.totalAccounts"),
      value: accounts.length,
      description: t("dashboard.totalAccountsDesc"),
      icon: Briefcase,
      gradient: "from-pink-600 to-rose-600",
    },
    {
      title: t("dashboard.totalTeams"),
      value: teams.length,
      description: t("dashboard.totalTeamsDesc"),
      icon: UsersRound,
      gradient: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      <StaggerContainer>
        <StaggerItem>
          <FadeInUp>
            <div>
              <h1 className="text-4xl font-bold">{t("dashboard.title")}</h1>
              <p className="text-muted-foreground mt-2">
                {t("dashboard.welcome")}
              </p>
            </div>
          </FadeInUp>
        </StaggerItem>

        <StaggerItem>
          <FadeInUp delay={0.1}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </FadeInUp>
        </StaggerItem>

        <StaggerItem>
          <FadeInUp delay={0.2}>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.growthChart")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.growthChartDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="users"
                        fill="hsl(var(--chart-1))"
                        name={t("dashboard.users")}
                      />
                      <Bar
                        dataKey="employees"
                        fill="hsl(var(--chart-2))"
                        name={t("dashboard.employees")}
                      />
                      <Bar
                        dataKey="accounts"
                        fill="hsl(var(--chart-3))"
                        name={t("dashboard.accounts")}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.trendChart")}</CardTitle>
                  <CardDescription>
                    {t("dashboard.trendChartDesc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name={t("dashboard.users")}
                      />
                      <Line
                        type="monotone"
                        dataKey="employees"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name={t("dashboard.employees")}
                      />
                      <Line
                        type="monotone"
                        dataKey="accounts"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        name={t("dashboard.accounts")}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </FadeInUp>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
