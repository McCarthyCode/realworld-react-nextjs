import Link from "next/link";

import { AuthorByline } from "@/components/ui/AuthorByline";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { TagList } from "@/components/ui/TagList";
import type { Article } from "@/types";

export interface ArticlePreviewProps {
  article: Article;
  /** Called when the favorite button is clicked. Omit to hide the button entirely (e.g. logged-out users). */
  onFavoriteClick?: () => void;
  isFavoriteLoading?: boolean;
}

/** A single article summary card, used in every article list across the app. */
export function ArticlePreview({
  article,
  onFavoriteClick,
  isFavoriteLoading,
}: ArticlePreviewProps) {
  return (
    <article className="border-b border-gray-200 py-6">
      <div className="mb-3 flex items-center justify-between">
        <AuthorByline author={article.author} date={article.createdAt} />
        {onFavoriteClick && (
          <FavoriteButton
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            onClick={onFavoriteClick}
            disabled={isFavoriteLoading}
          />
        )}
      </div>
      <Link href={`/article/${article.slug}`} className="block group">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600">
          {article.title}
        </h2>
        <p className="mt-1 text-gray-400">{article.description}</p>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-300">Read more...</span>
        <TagList tags={article.tagList} />
      </div>
    </article>
  );
}
