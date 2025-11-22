import { format } from "date-fns";

export function formatToReadableDate(dateString) {
  // Convert input string to Date object
  const date = new Date(dateString);

  // Format: "Sep 5, 2011"
  return format(date, "MMM d, yyyy");
}
