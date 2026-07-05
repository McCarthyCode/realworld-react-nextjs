export interface FollowButtonProps {
  username: string;
  following: boolean;
  onClick: () => void;
  disabled?: boolean;
}

/** Toggles following a user's profile. Purely presentational. */
export function FollowButton({ username, following, onClick, disabled }: FollowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={following}
      className={`inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        following
          ? "border-gray-500 bg-gray-500 text-white hover:bg-gray-600"
          : "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
      }`}
    >
      <span aria-hidden>+</span>
      {following ? `Unfollow ${username}` : `Follow ${username}`}
    </button>
  );
}
