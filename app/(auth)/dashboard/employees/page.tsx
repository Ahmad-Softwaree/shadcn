"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { employees, type Employee } from "@/lib/data/employees";
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

export default function EmployeesPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const handleEdit = (employee: Employee) => {
    openModal({
      type: "update",
      modalData: employee,
      entityType: "employee",
    });
  };

  const handleDelete = (employee: Employee) => {
    openModal({
      type: "delete",
      modalData: employee,
      id: employee.id,
      name: employee.name,
      entityType: "employee",
    });
  };

  const handleAddClick = () => {
    openModal({ type: "add", entityType: "employee" });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <FadeInUp>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("employees.title")}</h1>
            <p className="text-muted-foreground">
              {t("employees.description")}
            </p>
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
          placeholder={t("employees.searchPlaceholder")}
        />
      </FadeInUp>

      <FadeInUp delay={0.2}>
        {paginatedEmployees.length === 0 ? (
          <NoData />
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("employees.table.id")}</TableHead>
                  <TableHead>{t("employees.table.name")}</TableHead>
                  <TableHead>{t("employees.table.username")}</TableHead>
                  <TableHead>{t("employees.table.email")}</TableHead>
                  <TableHead>{t("employees.table.phone")}</TableHead>
                  <TableHead>{t("employees.table.dateOfBirth")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>
                      {new Date(employee.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ActionTooltip label={t("common.edit")}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(employee)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </ActionTooltip>
                        <ActionTooltip label={t("common.delete")}>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(employee)}>
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
