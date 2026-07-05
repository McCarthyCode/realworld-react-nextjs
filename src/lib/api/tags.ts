import { apiFetch } from "@/lib/http";

interface TagsResponse {
  tags: string[];
}

export function listTags(): Promise<string[]> {
  return apiFetch<TagsResponse>("/tags", { authenticated: false }).then(
    (res) => res.tags,
  );
}
