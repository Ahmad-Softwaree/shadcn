import { useTranslation } from "react-i18next";
import { SearchX } from "lucide-react";

export default function NoData() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{t("common.noData")}</h3>
      <p className="text-muted-foreground">{t("common.noDataDescription")}</p>
    </div>
  );
}
