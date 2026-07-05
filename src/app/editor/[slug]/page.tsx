"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import { ArticleEditorForm } from "@/components/article/ArticleEditorForm";
import { ErrorMessages } from "@/components/ui/ErrorMessages";
import { Spinner } from "@/components/ui/Spinner";
import { useArticle } from "@/hooks/useArticle";
import { useUpdateArticle } from "@/hooks/useArticleMutations";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { flattenApiErrors } from "@/lib/format";
import { ApiError } from "@/lib/http";
import type { CreateArticleInput } from "@/types";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { isLoading: isAuthLoading, isAuthenticated, user } = useRequireAuth();
  const router = useRouter();
  const { data: article, isLoading: isArticleLoading, isError } = useArticle(slug);
  const updateArticle = useUpdateArticle(slug);

  if (isAuthLoading || !isAuthenticated || isArticleLoading) {
    return <Spinner label="Loading article" />;
  }

  if (isError || !article) {
    return <ErrorMessages errors={["Article not found."]} />;
  }

  if (user && article.author.username !== user.username) {
    return <ErrorMessages errors={["You are not authorized to edit this article."]} />;
  }

  const handleSubmit = async (values: CreateArticleInput) => {
    try {
      const updated = await updateArticle.mutateAsync(values);
      router.push(`/article/${updated.slug}`);
    } catch {
      // Error state is surfaced via `updateArticle.error` below.
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <ArticleEditorForm
        initialValues={{
          title: article.title,
          description: article.description,
          body: article.body ?? "",
          tagList: article.tagList,
        }}
        onSubmit={handleSubmit}
        isSubmitting={updateArticle.isPending}
        errors={
          updateArticle.error instanceof ApiError
            ? flattenApiErrors(updateArticle.error.errors)
            : []
        }
      />
    </div>
  );
}
