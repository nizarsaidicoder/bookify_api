import { object, string, size, optional, enums, integer } from "superstruct";

export const CommentCreationData = object({
  content: size(string(), 1, 1000),
});
