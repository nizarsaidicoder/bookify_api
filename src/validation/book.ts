import {
  object,
  string,
  size,
  optional,
  integer,
  enums,
  refine,
  array,
} from "superstruct";
import { isInt } from "validator";

export const BookCreationData = object({
  title: size(string(), 1, 50),
  publicationYear: integer(),
  description: optional(size(string(), 1, 500)),
  cover: optional(size(string(), 1, 500)),
  tags: optional(array(string())),
});

export const BookUpdateData = object({
  title: optional(size(string(), 1, 50)),
  publicationYear: optional(integer()),
  description: optional(size(string(), 1, 500)),
  cover: optional(size(string(), 1, 500)),
  tags: optional(array(string())),
});

export const BookQueryData = object({
  page: optional(refine(string(), "int", (value) => isInt(value))),
  take: optional(refine(string(), "int", (value) => isInt(value))),
  title: optional(size(string(), 1, 50)),
  publicationYear: optional(refine(string(), "int", (value) => isInt(value))),
  include: optional(enums(["authors"])),
  sortBy: optional(enums(["title", "publicationYear"])),
  sortType: optional(enums(["asc", "desc"])),
});

export const BookSimilarityData = object({
  book_id: refine(string(), "int", (value) => isInt(value)),
});
