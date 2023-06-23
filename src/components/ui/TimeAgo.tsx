import React from "react";
import { format } from "timeago.js";
type Props = {
  date: Date;
};

export default function TimeAgo({ date }: Props) {
  return <time>{format(date, "en_US")}</time>;
}
