import { useQuery } from "@tanstack/react-query";

import { getArticle } from "@/lib/api/articles";
import { queryKeys } from "@/lib/query-keys";

export function useArticle(slug: string) {
  return useQuery({
    queryKey: queryKeys.article(slug),
    queryFn: () => getArticle(slug),
  });
}
