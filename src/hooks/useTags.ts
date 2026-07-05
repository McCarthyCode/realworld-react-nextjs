import { useQuery } from "@tanstack/react-query";

import { listTags } from "@/lib/api/tags";
import { queryKeys } from "@/lib/query-keys";

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags,
    queryFn: listTags,
    staleTime: 5 * 60_000,
  });
}
