import { apiFetch } from "@/lib/http";
import type { Comment } from "@/types";

interface CommentResponse {
  comment: Comment;
}

interface CommentsResponse {
  comments: Comment[];
}

export function listComments(slug: string): Promise<Comment[]> {
  return apiFetch<CommentsResponse>(
    `/articles/${encodeURIComponent(slug)}/comments`,
    { authenticated: true },
  ).then((res) => res.comments);
}

export function addComment(slug: string, body: string): Promise<Comment> {
  return apiFetch<CommentResponse>(
    `/articles/${encodeURIComponent(slug)}/comments`,
    { method: "POST", body: { comment: { body } } },
  ).then((res) => res.comment);
}

export function deleteComment(slug: string, id: number): Promise<void> {
  return apiFetch<void>(
    `/articles/${encodeURIComponent(slug)}/comments/${id}`,
    { method: "DELETE" },
  );
}
