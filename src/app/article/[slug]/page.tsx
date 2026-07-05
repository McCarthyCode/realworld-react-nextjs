"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { ArticleMeta } from "@/components/article/ArticleMeta";
import { CommentsSection } from "@/components/comment/CommentsSection";
import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { TagList } from "@/components/ui/TagList";
import { useArticle } from "@/hooks/useArticle";
import { useDeleteArticle } from "@/hooks/useArticleMutations";
import { useAuth } from "@/hooks/useAuth";
import { useFavoriteArticle } from "@/hooks/useFavoriteArticle";
import { useFollowUser } from "@/hooks/useProfile";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data: article, isLoading, isError } = useArticle(slug);
  const { toggle: toggleFavorite, isPending: isFavoritePending } = useFavoriteArticle();
  const { toggle: toggleFollow, isPending: isFollowPending } = useFollowUser();
  const deleteArticle = useDeleteArticle();

  if (isLoading) {
    return <Spinner label="Loading article" />;
  }

  if (isError || !article) {
    return <ErrorMessages errors={["Article not found."]} />;
  }

  const isOwnArticle = isAuthenticated && user?.username === article.author.username;

  const requireAuth = (action: () => void) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    action();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    await deleteArticle.mutateAsync(article.slug);
    router.push("/");
  };

  const meta = (
    <ArticleMeta
      article={article}
      isOwnArticle={Boolean(isOwnArticle)}
      onFavoriteClick={() => requireAuth(() => toggleFavorite(article))}
      isFavoriteLoading={isFavoritePending}
      onFollowClick={() => requireAuth(() => toggleFollow(article.author))}
      isFollowLoading={isFollowPending}
      onDeleteClick={handleDelete}
      isDeleteLoading={deleteArticle.isPending}
    />
  );

  return (
    <div>
      <div className="border-b border-gray-100 bg-gray-800 px-4 py-8 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
          {meta}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="prose max-w-none">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>

        <div className="mt-6">
          <TagList tags={article.tagList} />
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="mb-8 flex justify-center">{meta}</div>

        <CommentsSection slug={article.slug} />
      </div>
    </div>
  );
}
