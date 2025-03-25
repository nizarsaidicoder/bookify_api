import {
  object,
  string,
  size,
  optional,
  integer,
  enums,
  refine,
} from "superstruct";
import { isInt } from "validator";

export const BookCreationData = object({
  title: size(string(), 1, 50),
  publicationYear: integer(),
});

export const BookUpdateData = object({
  title: optional(size(string(), 1, 50)),
  publicationYear: integer(),
});

export const BookQueryData = object({
  page: optional(refine(string(), "int", (value) => isInt(value))),
  take: optional(refine(string(), "int", (value) => isInt(value))),
  title: optional(size(string(), 1, 50)),
  publicationYear: optional(refine(string(), "int", (value) => isInt(value))),
  include: optional(enums(["authors"])),
});
