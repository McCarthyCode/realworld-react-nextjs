"use client";

import Link from "next/link";

import { CommentCard } from "@/components/comment/CommentCard";
import { CommentForm } from "@/components/comment/CommentForm";
import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useAddComment, useComments, useDeleteComment } from "@/hooks/useComments";
import { flattenApiErrors } from "@/lib/format";
import { ApiError } from "@/lib/http";

export interface CommentsSectionProps {
  slug: string;
}

/** Fetches, lists, and manages creation/deletion of comments for an article. */
export function CommentsSection({ slug }: CommentsSectionProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: comments, isLoading, isError } = useComments(slug);
  const addComment = useAddComment(slug);
  const deleteComment = useDeleteComment(slug);

  if (isLoading) {
    return <Spinner label="Loading comments" />;
  }

  if (isError) {
    return <ErrorMessages errors={["Failed to load comments."]} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {isAuthenticated && user ? (
        <CommentForm
          currentUserImage={user.image}
          onSubmit={(body) => addComment.mutate(body)}
          isSubmitting={addComment.isPending}
        />
      ) : (
        <p className="text-gray-500">
          <Link href="/login" className="text-green-700 hover:underline">
            Sign in
          </Link>{" "}
          or{" "}
          <Link href="/register" className="text-green-700 hover:underline">
            sign up
          </Link>{" "}
          to add comments on this article.
        </p>
      )}

      {addComment.isError && (
        <ErrorMessages
          errors={
            addComment.error instanceof ApiError
              ? flattenApiErrors(addComment.error.errors)
              : ["Failed to post comment."]
          }
        />
      )}

      <div className="mt-6 flex flex-col gap-4">
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={
              user?.username === comment.author.username
                ? () => deleteComment.mutate(comment.id)
                : undefined
            }
            isDeleting={deleteComment.isPending}
          />
        ))}
      </div>
    </div>
  );
}
