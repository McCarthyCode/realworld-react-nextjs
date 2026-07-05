export interface PaginationProps {
  /** Total number of items across all pages. */
  total: number;
  /** Number of items per page. */
  limit: number;
  /** Current 1-indexed page. */
  currentPage: number;
  onPageChange: (page: number) => void;
}

/** Numbered pagination control used below article lists. Renders nothing for a single page. */
export function Pagination({ total, limit, currentPage, onPageChange }: PaginationProps) {
  const pageCount = Math.ceil(total / limit);

  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination">
      <ul className="flex list-none gap-1">
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={`h-9 min-w-9 rounded border px-3 text-sm ${
                page === currentPage
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-300 text-green-600 hover:border-green-600"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
