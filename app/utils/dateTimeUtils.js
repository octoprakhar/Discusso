import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  format,
} from "date-fns";

export function formatToReadableDate(dateString) {
  // Convert input string to Date object
  const date = new Date(dateString);

  // Format: "Sep 5, 2011"
  return format(date, "MMM d, yyyy");
}

export function formatToTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const years = differenceInYears(now, date);
  if (years > 0) return `${years}y`;

  const months = differenceInMonths(now, date);
  if (months > 0) return `${months}m`;

  const weeks = differenceInWeeks(now, date);
  if (weeks > 0) return `${weeks}w`;

  const days = differenceInDays(now, date);
  if (days > 0) return `${days}d`;

  return "today";
}
