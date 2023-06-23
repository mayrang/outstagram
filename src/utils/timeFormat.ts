import { format } from "timeago.js";

export function parseDate(createdAt: Date) {
  return format(createdAt, "en_US");
}
