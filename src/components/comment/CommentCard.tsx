import { AuthorByline } from "@/components/ui/AuthorByline";
import type { Comment } from "@/types";

export interface CommentCardProps {
  comment: Comment;
  /** Provided only when the current user authored the comment. */
  onDelete?: () => void;
  isDeleting?: boolean;
}

/** A single comment on an article, with an optional delete action for its author. */
export function CommentCard({ comment, onDelete, isDeleting }: CommentCardProps) {
  return (
    <div className="rounded border border-gray-200">
      <div className="border-b border-gray-200 p-4">
        <p className="text-gray-700">{comment.body}</p>
      </div>
      <div className="flex items-center justify-between p-3">
        <AuthorByline author={comment.author} date={comment.createdAt} />
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete comment"
            className="text-gray-400 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
