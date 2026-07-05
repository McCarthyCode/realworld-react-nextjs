# ![RealWorld Example Frontend App – React/Next.js](logo.png)

> ### React/Next.js codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

This codebase was built with **Next.js (App Router) + TypeScript + Tailwind CSS**, backed by **TanStack Query** for server state and the official [NestJS/MikroORM RealWorld API](https://github.com/mikro-orm/nestjs-realworld-example-app) (run locally via Docker Compose).

## How it works

### Architecture at a glance

```
src/
  app/            Next.js App Router pages (routing only — thin wrappers around components/hooks)
  components/
    layout/       Header, Footer — app chrome
    ui/           Small, reusable, presentational primitives (Avatar, Spinner, FavoriteButton, ...)
    article/      Article-related building blocks (ArticlePreview, ArticleList, ArticleEditorForm, ...)
    comment/      Comment building blocks (CommentCard, CommentForm, CommentsSection)
    profile/      Profile page building blocks (ProfileHeader, ProfileArticleTabs)
  hooks/          Data-fetching & mutation hooks built on TanStack Query, plus useAuth/useRequireAuth
  lib/
    api/          One module per REST resource (users, articles, comments, profiles, tags) — thin,
                   typed wrappers around the fetch client
    http.ts        Shared fetch wrapper: attaches the JWT, normalizes API error responses
    query-keys.ts  Centralized query-key factory to keep cache invalidation consistent
    format.ts      Small formatting/parsing utilities
  types/          Shared TypeScript types mirroring the RealWorld API response shapes
```

### Key decisions

- **Presentational vs. container components.** Most components under `components/` (e.g.
  `ArticlePreview`, `FavoriteButton`, `CommentCard`, `ProfileHeader`) are pure/presentational —
  they take data and callbacks as props and render UI. This keeps them trivially reusable and easy
  to cover with Storybook stories. A smaller number of "smart" components (`ArticleList`,
  `CommentsSection`, `TagsSidebar`, `Header`) own the data-fetching/mutation hooks and wire the
  presentational components together. Pages under `app/` are thin: they compose these components
  and own only page-specific state (like the active tab or current page number).
- **TanStack Query for all server state.** Every API read goes through a `useQuery` hook in
  `src/hooks`; every write is a `useMutation`. Mutations update the query cache directly (e.g.
  favoriting an article patches both the article-detail cache and any list caches containing that
  article) instead of blindly refetching, so the UI feels instant.
- **Auth via React Context + TanStack Query.** `AuthProvider` (`src/hooks/useAuth.tsx`) stores the
  JWT in `localStorage`, fetches `GET /user` once a token is present, and exposes
  `user`/`isAuthenticated`/`login`/`register`/`logout` to the rest of the app. `useRequireAuth`
  redirects to `/login` from protected pages (Settings, Editor) once we've confirmed there's no
  session.
- **Typed API layer.** `src/lib/http.ts` is a small `fetch` wrapper that attaches
  `Authorization: Token <jwt>`, parses RealWorld's `422 { errors: { field: string[] } }` shape into
  a typed `ApiError`, and normalizes non-conforming error payloads (some endpoints return
  `{ message: string }` instead) so the rest of the app only ever deals with one shape.
- **Tailwind CSS** for styling — no external CSS framework/theme, built to closely match the
  classic Conduit layout without carrying over its Bootstrap dependency.
- **Markdown rendering** via `react-markdown` for article bodies, matching the spec's "render
  markdown from server, client side" requirement.

## Getting started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose (for the backend API)

### 1. Install dependencies

```bash
npm install
```

### 2. Run the backend API

This repo includes a `docker-compose.yaml` that builds and runs the official NestJS RealWorld
example API (backed by MySQL) and exposes it on `http://localhost:3000/api`:

```bash
docker compose up -d
```

> The compose file applies `server.patch` on top of the upstream repo, which supplies local config
> (DB connection, JWT secret) and fixes an upstream bug where `limit`/`offset` query params were
> passed to the SQL query builder as strings instead of numbers (causing a 500 on any paginated
> article list request).

### 3. Configure the frontend's API URL

```bash
cp .env.local.example .env.local
```

By default this points at `http://localhost:3000/api` (the Dockerized backend above). Point it at
`https://api.realworld.show/api` instead if you'd rather use the public demo API.

### 4. Run the frontend dev server

```bash
npm run dev
```

The app runs on **http://localhost:3001** (port `3000` is reserved for the backend API above).

### 5. Run Storybook

```bash
npm run storybook
```

Opens on http://localhost:6006 with stories for every reusable presentational component, covering
default/empty/loading/error/interactive states.

### 6. Run unit tests

```bash
npm run test           # run once
npm run test:watch     # watch mode
npm run test:coverage  # with coverage
```

Unit tests (Vitest + React Testing Library) cover the API/http layer, formatting utilities,
data-fetching hooks (query key/filter logic, cache updates on mutation), and component behavior.

Story files also double as component tests — `npm run test:storybook` runs every story through
Storybook's Vitest addon in a real browser (via Playwright) to catch rendering/interaction
regressions.

### 7. Run end-to-end tests

E2E tests run against a **real, running instance** of both the frontend and the backend API (they
create real users/articles against the database), so make sure both are running first:

```bash
docker compose up -d   # backend on :3000
npm run build          # E2E runs against a production build
npx playwright test    # boots the frontend on :3001 automatically and runs the suite
```

Covers: registration/login/logout (+ validation errors), full article CRUD, commenting
(add/delete), favoriting, and following/unfollowing — the full set of "critical user flows" called
out in the spec.

## Scripts reference

| Script                  | Description                                   |
| ------------------------ | ---------------------------------------------- |
| `npm run dev`            | Start the Next.js dev server on port 3001      |
| `npm run build`          | Production build                               |
| `npm run start`          | Serve the production build on port 3001        |
| `npm run lint`           | ESLint                                         |
| `npm run storybook`      | Storybook dev server on port 6006              |
| `npm run build-storybook`| Static Storybook build                         |
| `npm run test`           | Unit tests (Vitest, jsdom)                     |
| `npm run test:watch`     | Unit tests in watch mode                        |
| `npm run test:coverage`  | Unit tests with coverage report                |
| `npm run test:storybook` | Run all stories as browser tests                |
| `npm run test:e2e`       | Playwright end-to-end tests                     |

For more information on how this works with other frontends/backends, head over to the
[RealWorld](https://github.com/gothinkster/realworld) repo.
