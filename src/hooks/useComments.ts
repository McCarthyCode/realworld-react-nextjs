import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addComment, deleteComment, listComments } from "@/lib/api/comments";
import { queryKeys } from "@/lib/query-keys";

export function useComments(slug: string) {
  return useQuery({
    queryKey: queryKeys.comments(slug),
    queryFn: () => listComments(slug),
  });
}

export function useAddComment(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: string) => addComment(slug, body),
    onSuccess: (comment) => {
      queryClient.setQueryData(queryKeys.comments(slug), (existing: unknown) =>
        Array.isArray(existing) ? [comment, ...existing] : [comment],
      );
    },
  });
}

export function useDeleteComment(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(slug, id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData(queryKeys.comments(slug), (existing: unknown) =>
        Array.isArray(existing)
          ? existing.filter((comment) => comment.id !== id)
          : existing,
      );
    },
  });
}
