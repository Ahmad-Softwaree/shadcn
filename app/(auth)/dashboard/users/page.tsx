"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { users, type User } from "@/lib/data/users";
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

export default function UsersPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleEdit = (user: User) => {
    openModal({
      type: "update",
      modalData: user,
      entityType: "user",
    });
  };

  const handleDelete = (user: User) => {
    openModal({
      type: "delete",
      modalData: user,
      id: user.id,
      name: user.name,
      entityType: "user",
    });
  };

  const handleAddClick = () => {
    openModal({ type: "add", entityType: "user" });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <FadeInUp>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("users.title")}</h1>
            <p className="text-muted-foreground">{t("users.description")}</p>
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
          placeholder={t("users.searchPlaceholder")}
        />
      </FadeInUp>

      <FadeInUp delay={0.2}>
        {paginatedUsers.length === 0 ? (
          <NoData />
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("users.table.id")}</TableHead>
                  <TableHead>{t("users.table.name")}</TableHead>
                  <TableHead>{t("users.table.username")}</TableHead>
                  <TableHead>{t("users.table.email")}</TableHead>
                  <TableHead>{t("users.table.phone")}</TableHead>
                  <TableHead>{t("users.table.dateOfBirth")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ActionTooltip label={t("common.edit")}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(user)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </ActionTooltip>
                        <ActionTooltip label={t("common.delete")}>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(user)}>
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
