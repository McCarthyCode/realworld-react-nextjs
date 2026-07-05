export interface FavoriteButtonProps {
  favorited: boolean;
  favoritesCount: number;
  onClick: () => void;
  disabled?: boolean;
  /** Compact style used in article previews vs. the larger button on the article page. */
  size?: "sm" | "lg";
}

/** Toggles favoriting an article. Purely presentational — callers own the mutation/auth logic. */
export function FavoriteButton({
  favorited,
  favoritesCount,
  onClick,
  disabled,
  size = "sm",
}: FavoriteButtonProps) {
  const base =
    "inline-flex items-center gap-1 rounded border font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";
  const colorClasses = favorited
    ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
    : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={favorited}
      className={`${base} ${sizeClasses} ${colorClasses}`}
    >
      <span aria-hidden>♥</span>
      {favorited ? "Unfavorite" : "Favorite"} ({favoritesCount})
    </button>
  );
}
