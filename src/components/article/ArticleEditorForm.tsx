"use client";

import { useState, type FormEvent } from "react";

import { ErrorMessages } from "@/components/ui/ErrorMessages";
import type { CreateArticleInput } from "@/types";

export interface ArticleEditorFormProps {
  initialValues?: CreateArticleInput;
  onSubmit: (values: CreateArticleInput) => void;
  isSubmitting?: boolean;
  errors?: string[];
}

const emptyValues: CreateArticleInput = {
  title: "",
  description: "",
  body: "",
  tagList: [],
};

/** Create/edit form for articles, shared by the "New Article" and "Edit Article" pages. */
export function ArticleEditorForm({
  initialValues = emptyValues,
  onSubmit,
  isSubmitting,
  errors = [],
}: ArticleEditorFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [body, setBody] = useState(initialValues.body);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>(initialValues.tagList);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tagList.includes(trimmed)) {
      setTagList([...tagList, trimmed]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTagList(tagList.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ title, description, body, tagList });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ErrorMessages errors={errors} />

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Article Title"
        required
        className="w-full rounded border border-gray-300 p-3 text-xl"
      />
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What's this article about?"
        required
        className="w-full rounded border border-gray-300 p-3"
      />
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Write your article (in markdown)"
        required
        rows={10}
        className="w-full resize-none rounded border border-gray-300 p-3 font-mono text-sm"
      />
      <div>
        <input
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
          onKeyDown={handleTagKeyDown}
          onBlur={addTag}
          placeholder="Enter tags (press Enter to add)"
          className="w-full rounded border border-gray-300 p-3"
        />
        {tagList.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5 list-none">
            {tagList.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                  className="text-gray-400 hover:text-red-600"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="self-end rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Publish Article
      </button>
    </form>
  );
}
