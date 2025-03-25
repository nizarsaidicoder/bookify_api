import { isInt } from "validator";
import { object, optional, refine, string } from "superstruct";

export const ReqParams = object({
  author_id: optional(refine(string(), "author_id", (value) => isInt(value))),
  book_id: optional(refine(string(), "book_id", (value) => isInt(value))),
  tag_id: optional(refine(string(), "tag_id", (value) => isInt(value))),
  comment_id: optional(refine(string(), "comment_id", (value) => isInt(value))),
  rating_id: optional(refine(string(), "rating_id", (value) => isInt(value))),
});
