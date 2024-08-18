export function formatReleaseDate(date: string | number | Date | undefined): string {
  if (!date) return "Unknown Release Date"; // Default return value for undefined dates
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}