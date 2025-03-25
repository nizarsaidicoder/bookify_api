import { object, integer, refine } from "superstruct";

export const RatingCreationData = object({
  rating: refine(integer(), "rating", (value) => value >= 1 && value <= 5),
});
export const RatingUpdateData = object({
  rating: refine(integer(), "rating", (value) => value >= 1 && value <= 5),
});
