"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { teams, type Team } from "@/lib/data/teams";
import { employees } from "@/lib/data/employees";
import { useModalStore } from "@/lib/store/modal.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import AddButton from "@/components/shared/AddButton";
import Search from "@/components/shared/Search";
import NoData from "@/components/shared/NoData";
import ActionTooltip from "@/components/shared/ActionTooltip";
import Loading from "@/components/shared/Loading";
import { FadeInUp } from "@/components/shared/animate";

const ITEMS_PER_PAGE = 5;

export default function TeamsPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);
  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTeams.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTeams, currentPage]);

  const getEmployeeNames = (employeeIds: number[]) => {
    return employeeIds
      .map((id) => employees.find((emp) => emp.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleEdit = (team: Team) => {
    openModal({
      type: "update",
      modalData: team,
      entityType: "team",
    });
  };

  const handleDelete = (team: Team) => {
    openModal({
      type: "delete",
      modalData: team,
      id: team.id,
      name: team.name,
      entityType: "team",
    });
  };

  const handleAddClick = () => {
    openModal({ type: "add", entityType: "team" });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <FadeInUp>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("teams.title")}</h1>
            <p className="text-muted-foreground">{t("teams.description")}</p>
          </div>
          <AddButton onClick={handleAddClick} />
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <Search
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder={t("teams.searchPlaceholder")}
        />
      </FadeInUp>

      <FadeInUp delay={0.2}>
        {paginatedTeams.length === 0 ? (
          <NoData />
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("teams.table.id")}</TableHead>
                  <TableHead>{t("teams.table.name")}</TableHead>
                  <TableHead>{t("teams.table.employeeCount")}</TableHead>
                  <TableHead>{t("teams.table.employees")}</TableHead>
                  <TableHead>{t("teams.table.createdAt")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.id}</TableCell>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.employeeCount}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {getEmployeeNames(team.employeeIds)}
                    </TableCell>
                    <TableCell>
                      {new Date(team.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ActionTooltip label={t("common.edit")}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(team)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </ActionTooltip>
                        <ActionTooltip label={t("common.delete")}>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(team)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </ActionTooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </FadeInUp>

      {totalPages > 1 && (
        <FadeInUp delay={0.3}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </FadeInUp>
      )}
    </div>
  );
}
