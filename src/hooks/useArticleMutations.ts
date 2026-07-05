import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createArticle,
  deleteArticle,
  updateArticle,
} from "@/lib/api/articles";
import { queryKeys } from "@/lib/query-keys";
import type { CreateArticleInput, UpdateArticleInput } from "@/types";

export function useCreateArticle() {
  return useMutation({
    mutationFn: (input: CreateArticleInput) => createArticle(input),
  });
}

export function useUpdateArticle(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateArticleInput) => updateArticle(slug, input),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.article(updated.slug), updated);
    },
  });
}

export function useDeleteArticle() {
  return useMutation({
    mutationFn: (slug: string) => deleteArticle(slug),
  });
}
