/**
 * Core domain types shared across the app.
 * These mirror the JSON shapes defined by the RealWorld API spec:
 * https://docs.realworld.show/specifications/backend/api-response-format/
 */

export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  /** Not present in list responses (`GET /articles`, `GET /articles/feed`). */
  body?: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export interface GenericErrors {
  errors: Record<string, string[]>;
}

export interface ArticlesFilter {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface CreateArticleInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export type UpdateArticleInput = Partial<CreateArticleInput>;

export interface UpdateUserInput {
  email?: string;
  username?: string;
  password?: string;
  bio?: string;
  image?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}
