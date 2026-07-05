import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { formatDate } from "@/lib/format";
import type { Profile } from "@/types";

export interface AuthorBylineProps {
  author: Profile;
  /** ISO date string, e.g. an article's `createdAt`. Omit for author-only bylines. */
  date?: string;
}

/** Author avatar + name (linking to their profile) + optional publish date. */
export function AuthorByline({ author, date }: AuthorBylineProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/profile/${author.username}`}>
        <Avatar src={author.image} alt={author.username} />
      </Link>
      <div className="leading-tight">
        <Link
          href={`/profile/${author.username}`}
          className="block font-medium text-green-700 hover:underline"
        >
          {author.username}
        </Link>
        {date && <span className="block text-xs text-gray-400">{formatDate(date)}</span>}
      </div>
    </div>
  );
}
