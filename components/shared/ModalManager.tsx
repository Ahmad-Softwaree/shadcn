"use client";

import { useModalStore } from "@/lib/store/modal.store";
import { useTranslation } from "react-i18next";
import Modal from "@/components/shared/Modal";
import { EmployeeForm } from "@/components/forms/employee-form";
import { UserForm } from "@/components/forms/user-form";
import { AccountForm } from "@/components/forms/account-form";
import { TeamForm } from "@/components/forms/team-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function ModalManager() {
  const { modal, closeModal, modalData, entityType } = useModalStore();
  const { t } = useTranslation();

  const handleDelete = () => {
    console.log("Deleting:", entityType, modalData);
    if (entityType) {
      const successKey = `${entityType}s.deleteSuccess` as any;
      toast.success(t(successKey));
    }
    closeModal();
  };

  // Add modals
  if (modal === "add") {
    if (entityType === "employee") {
      return (
        <Modal
          title={t("employees.createTitle")}
          description={t("employees.createDescription")}>
          <EmployeeForm state="insert" />
        </Modal>
      );
    }
    if (entityType === "user") {
      return (
        <Modal
          title={t("users.createTitle")}
          description={t("users.createDescription")}>
          <UserForm state="insert" />
        </Modal>
      );
    }
    if (entityType === "account") {
      return (
        <Modal
          title={t("accounts.createTitle")}
          description={t("accounts.createDescription")}>
          <AccountForm state="insert" />
        </Modal>
      );
    }
    if (entityType === "team") {
      return (
        <Modal
          title={t("teams.createTitle")}
          description={t("teams.createDescription")}>
          <TeamForm state="insert" />
        </Modal>
      );
    }
  }

  // Update modals
  if (modal === "update") {
    if (entityType === "employee") {
      return (
        <Modal
          title={t("employees.updateTitle")}
          description={t("employees.updateDescription")}>
          <EmployeeForm state="update" />
        </Modal>
      );
    }
    if (entityType === "user") {
      return (
        <Modal
          title={t("users.updateTitle")}
          description={t("users.updateDescription")}>
          <UserForm state="update" />
        </Modal>
      );
    }
    if (entityType === "account") {
      return (
        <Modal
          title={t("accounts.updateTitle")}
          description={t("accounts.updateDescription")}>
          <AccountForm state="update" />
        </Modal>
      );
    }
    if (entityType === "team") {
      return (
        <Modal
          title={t("teams.updateTitle")}
          description={t("teams.updateDescription")}>
          <TeamForm state="update" />
        </Modal>
      );
    }
  }

  // Delete modal
  if (modal === "delete") {
    return (
      <AlertDialog open={true} onOpenChange={closeModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("common.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("common.deleteDescription", { name: modalData?.name || "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
}
