import { ENUMs } from "@/lib/enums";
import { Search as SearchIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useAppQueryParams } from "@/hooks/useAppQuery";

const Search = ({
  className,
  placeholder,
  value,
  onChange,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"input">>) => {
  const { t } = useTranslation();
  const searchValue = (value as string) || "";

  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        onChange={onChange}
        value={searchValue}
        placeholder={placeholder ?? t("common.searchPlaceholder")}
        className={cn(className, "pl-10 pr-10")}
        type="text"
        {...props}
      />

      {searchValue !== "" && onChange && (
        <Button
          onClick={() => {
            const event = {
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
          }}
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7">
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default Search;
