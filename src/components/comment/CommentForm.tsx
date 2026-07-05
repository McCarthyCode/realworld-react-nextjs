"use client";

import { useState, type FormEvent } from "react";

import { Avatar } from "@/components/ui/Avatar";

export interface CommentFormProps {
  currentUserImage: string | null;
  onSubmit: (body: string) => void;
  isSubmitting?: boolean;
}

/** Textarea + submit button for posting a new comment on an article. */
export function CommentForm({ currentUserImage, onSubmit, isSubmitting }: CommentFormProps) {
  const [body, setBody] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded border border-gray-200">
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="w-full resize-none rounded-t p-3 outline-none"
      />
      <div className="flex items-center justify-between p-3">
        <Avatar src={currentUserImage} alt="You" size={24} />
        <button
          type="submit"
          disabled={isSubmitting || body.trim().length === 0}
          className="rounded bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
}
