"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { accounts, type Account } from "@/lib/data/accounts";
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

export default function AccountsPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) =>
      Object.values(account)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, currentPage]);

  const handleEdit = (account: Account) => {
    openModal({
      type: "update",
      modalData: account,
      entityType: "account",
    });
  };

  const handleDelete = (account: Account) => {
    openModal({
      type: "delete",
      modalData: account,
      id: account.id,
      name: account.name,
      entityType: "account",
    });
  };

  const handleAddClick = () => {
    openModal({ type: "add", entityType: "account" });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <FadeInUp>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("accounts.title")}</h1>
            <p className="text-muted-foreground">{t("accounts.description")}</p>
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
          placeholder={t("accounts.searchPlaceholder")}
        />
      </FadeInUp>

      <FadeInUp delay={0.2}>
        {paginatedAccounts.length === 0 ? (
          <NoData />
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("accounts.table.id")}</TableHead>
                  <TableHead>{t("accounts.table.name")}</TableHead>
                  <TableHead>{t("accounts.table.username")}</TableHead>
                  <TableHead>{t("accounts.table.email")}</TableHead>
                  <TableHead>{t("accounts.table.phone")}</TableHead>
                  <TableHead>{t("accounts.table.dateOfBirth")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.id}</TableCell>
                    <TableCell className="font-medium">
                      {account.name}
                    </TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>{account.phone}</TableCell>
                    <TableCell>
                      {new Date(account.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ActionTooltip label={t("common.edit")}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(account)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </ActionTooltip>
                        <ActionTooltip label={t("common.delete")}>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(account)}>
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
