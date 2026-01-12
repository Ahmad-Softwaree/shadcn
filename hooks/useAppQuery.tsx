"use client";

import { ENUMs } from "@/lib/enums";
import { parseAsString, useQueryStates } from "nuqs";

export function useAppQueryParams() {
  const [queries, setQueries] = useQueryStates(
    {
      [ENUMs.PARAMS.SEARCH]: parseAsString.withDefault(""),
    },
    {
      shallow: true,
    }
  );

  return {
    queries,
    setQueries,
  };
}
