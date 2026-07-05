import { format, parseISO } from "date-fns";

/** Formats an ISO date string the way the Conduit reference apps do, e.g. "January 20, 2016". */
export function formatDate(isoDate: string): string {
  return format(parseISO(isoDate), "MMMM d, yyyy");
}

/** Flattens the `{ field: string[] }` error shape returned by the API into display-ready strings. */
export function flattenApiErrors(
  errors: Record<string, string[]> | undefined | null,
): string[] {
  if (!errors) return [];
  return Object.entries(errors).map(([field, messages]) => `${field} ${messages.join(", ")}`);
}
