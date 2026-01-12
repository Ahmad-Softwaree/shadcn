import { Pen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useModalStore } from "@/lib/store/modal.store";
import { useTranslation } from "react-i18next";

const UpdateTooltip = <T extends any>({
  onClick,
  oldData,
  id,
}: {
  onClick?: () => void;
  oldData?: T;
  id?: number;
}) => {
  const { openModal } = useModalStore();
  const { t } = useTranslation();
  return (
    <Tooltip>
      <TooltipTrigger
        className="w-full"
        onClick={
          onClick
            ? onClick
            : () => {
                openModal({ type: "update", id, modalData: oldData });
              }
        }>
        <Button className="w-full" variant={"secondary"}>
          <Pen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{t("common.update")}</TooltipContent>
    </Tooltip>
  );
};

export default UpdateTooltip;
