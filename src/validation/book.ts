import {
  object,
  string,
  size,
  optional,
  integer,
  enums,
  refine,
  array,
  number,
} from "superstruct";
import { isInt } from "validator";

export const BookCreationData = object({
  title: size(string(), 1, 100),
  publicationYear: number(),
  description: optional(size(string(), 1, 2000)),
  cover: optional(size(string(), 1, 500)),
  tags: optional(string()),
});

export const BookUpdateData = object({
  title: optional(size(string(), 1, 100)),
  publicationYear: optional(number()),
  description: optional(size(string(), 1, 2000)),
  cover: optional(size(string(), 1, 500)),
  tags: optional(string()),
});

export const BookQueryData = object({
  page: optional(refine(string(), "int", (value) => isInt(value))),
  take: optional(refine(string(), "int", (value) => isInt(value))),
  title: optional(size(string(), 1, 100)),
  publicationYear: optional(refine(string(), "int", (value) => isInt(value))),
  include: optional(enums(["authors"])),
  sortBy: optional(enums(["title", "publicationYear", "avgRating"])),
  sortType: optional(enums(["asc", "desc"])),
  tags: optional(string()),
});

export const BookSimilarityData = object({
  book_id: refine(string(), "int", (value) => isInt(value)),
});
