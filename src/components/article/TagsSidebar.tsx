"use client";

import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { TagList } from "@/components/ui/TagList";
import { useTags } from "@/hooks/useTags";

export interface TagsSidebarProps {
  activeTag?: string;
  onTagClick: (tag: string) => void;
}

/** Sidebar listing all article tags, used to filter the home page feed. */
export function TagsSidebar({ activeTag, onTagClick }: TagsSidebarProps) {
  const { data: tags, isLoading, isError } = useTags();

  return (
    <aside className="rounded bg-gray-100 p-4">
      <p className="mb-2 text-sm font-medium text-gray-600">Popular Tags</p>
      {isLoading && <Spinner size="sm" label="Loading tags" />}
      {isError && <ErrorMessages errors={["Failed to load tags."]} />}
      {tags && tags.length === 0 && <p className="text-sm text-gray-400">No tags yet.</p>}
      {tags && tags.length > 0 && (
        <TagList tags={tags} onTagClick={onTagClick} activeTag={activeTag} />
      )}
    </aside>
  );
}
