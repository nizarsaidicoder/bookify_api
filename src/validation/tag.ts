import { object, string, size, optional } from "superstruct";

export const TagCreationData = object({
  name: size(string(), 1, 50),
  color: optional(size(string(), 1, 8)),
});

export const TagUpdateData = optional(TagCreationData);
