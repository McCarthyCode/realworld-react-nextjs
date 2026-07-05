export interface SpinnerProps {
  /** Accessible label announced to screen readers while content loads. */
  label?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
};

/** A simple spinning indicator used anywhere content is being fetched. */
export function Spinner({ label = "Loading…", size = "md" }: SpinnerProps) {
  return (
    <div role="status" className="flex items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-green-600 border-t-transparent ${SIZE_CLASSES[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
