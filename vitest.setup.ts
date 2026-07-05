import "@testing-library/jest-dom/vitest";

// Ensure date formatting in tests is deterministic regardless of the host machine's timezone.
process.env.TZ = "UTC";
