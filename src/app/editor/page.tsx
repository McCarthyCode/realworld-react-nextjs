"use client";

import { useRouter } from "next/navigation";

import { ArticleEditorForm } from "@/components/article/ArticleEditorForm";
import { Spinner } from "@/components/ui/Spinner";
import { useCreateArticle } from "@/hooks/useArticleMutations";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { flattenApiErrors } from "@/lib/format";
import { ApiError } from "@/lib/http";
import type { CreateArticleInput } from "@/types";

export default function NewArticlePage() {
  const { isLoading, isAuthenticated } = useRequireAuth();
  const router = useRouter();
  const createArticle = useCreateArticle();

  if (isLoading || !isAuthenticated) {
    return <Spinner label="Loading editor" />;
  }

  const handleSubmit = async (values: CreateArticleInput) => {
    try {
      const article = await createArticle.mutateAsync(values);
      router.push(`/article/${article.slug}`);
    } catch {
      // Error state is surfaced via `createArticle.error` below.
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <ArticleEditorForm
        onSubmit={handleSubmit}
        isSubmitting={createArticle.isPending}
        errors={
          createArticle.error instanceof ApiError
            ? flattenApiErrors(createArticle.error.errors)
            : []
        }
      />
    </div>
  );
}
