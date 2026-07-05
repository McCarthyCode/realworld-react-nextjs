export interface ErrorMessagesProps {
  /** List of human-readable error strings. Renders nothing when empty. */
  errors: string[];
}

/** Displays a list of form/API errors, styled like Conduit's `error-messages`. */
export function ErrorMessages({ errors }: ErrorMessagesProps) {
  if (errors.length === 0) return null;

  return (
    <ul className="mb-4 list-none rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
}
