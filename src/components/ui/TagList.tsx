export interface TagListProps {
  tags: string[];
  /** When provided, renders each tag as a clickable filter button. */
  onTagClick?: (tag: string) => void;
  /** Highlights the currently active tag when filtering. */
  activeTag?: string;
}

/** Renders a row of article tags, optionally interactive for filtering. */
export function TagList({ tags, onTagClick, activeTag }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5 list-none">
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        const className = `inline-block rounded-full border px-2.5 py-0.5 text-xs font-light ${
          isActive
            ? "border-green-600 bg-green-600 text-white"
            : "border-gray-300 bg-gray-100 text-gray-500"
        }`;

        if (!onTagClick) {
          return (
            <li key={tag}>
              <span className={className}>{tag}</span>
            </li>
          );
        }

        return (
          <li key={tag}>
            <button
              type="button"
              className={`${className} cursor-pointer hover:opacity-80`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
