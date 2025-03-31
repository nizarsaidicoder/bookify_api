import { object, number, integer } from "superstruct";

export const RatingCreationData = object({
  rating: integer(),
});
export const RatingUpdateData = object({
  rating: integer(),
});
