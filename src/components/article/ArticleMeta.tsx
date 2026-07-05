import Link from "next/link";

import { AuthorByline } from "@/components/ui/AuthorByline";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { FollowButton } from "@/components/ui/FollowButton";
import type { Article } from "@/types";

export interface ArticleMetaProps {
  article: Article;
  /** Whether the current viewer authored this article — toggles Edit/Delete vs. Favorite/Follow. */
  isOwnArticle: boolean;
  onFavoriteClick: () => void;
  isFavoriteLoading?: boolean;
  onFollowClick: () => void;
  isFollowLoading?: boolean;
  onDeleteClick: () => void;
  isDeleteLoading?: boolean;
}

/** Byline + action buttons shown at the top (and bottom) of the article detail page. */
export function ArticleMeta({
  article,
  isOwnArticle,
  onFavoriteClick,
  isFavoriteLoading,
  onFollowClick,
  isFollowLoading,
  onDeleteClick,
  isDeleteLoading,
}: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <AuthorByline author={article.author} date={article.createdAt} />
      <div className="flex items-center gap-2">
        {isOwnArticle ? (
          <>
            <Link
              href={`/editor/${article.slug}`}
              className="inline-flex items-center gap-1 rounded border border-gray-400 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
            >
              Edit Article
            </Link>
            <button
              type="button"
              onClick={onDeleteClick}
              disabled={isDeleteLoading}
              className="inline-flex items-center gap-1 rounded border border-red-500 px-3 py-1.5 text-sm text-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Delete Article
            </button>
          </>
        ) : (
          <>
            <FollowButton
              username={article.author.username}
              following={article.author.following}
              onClick={onFollowClick}
              disabled={isFollowLoading}
            />
            <FavoriteButton
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              onClick={onFavoriteClick}
              disabled={isFavoriteLoading}
              size="lg"
            />
          </>
        )}
      </div>
    </div>
  );
}
