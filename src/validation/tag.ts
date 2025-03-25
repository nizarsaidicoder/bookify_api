import { object, string, size } from "superstruct";

export const TagCreationData = object({
  name: size(string(), 1, 50),
});

export const TagUpdateData = object({
  name: size(string(), 1, 50),
});
