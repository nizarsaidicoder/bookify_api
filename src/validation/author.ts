import {
  object,
  string,
  size,
  optional,
  enums,
  refine,
  number,
} from "superstruct";
import { isInt } from "validator";

export const AuthorCreationData = object({
  firstname: size(string(), 1, 50),
  lastname: size(string(), 1, 50),
  birthYear: optional(number()),
  deathYear: optional(number()),
  bio: optional(size(string(), 0, 500)),
  image: optional(size(string(), 0, 500)),
});

export const AuthorUpdateData = object({
  firstname: optional(size(string(), 1, 50)),
  lastname: optional(size(string(), 1, 50)),
  birthYear: optional(number()),
  deathYear: optional(number()),
  bio: optional(size(string(), 0, 2000)),
  image: optional(size(string(), 0, 500)),
});

export const AuthorQueryData = object({
  page: optional(refine(string(), "int", (value) => isInt(value))),
  take: optional(refine(string(), "int", (value) => isInt(value))),
  firstname: optional(size(string(), 1, 50)),
  lastname: optional(size(string(), 1, 50)),
  hasSome: optional(enums(["true", "false"])),
  includeBooks: optional(enums(["true", "false"])),
  sortBy: optional(enums(["firstname", "lastname"])),
  sortType: optional(enums(["asc", "desc"])),
});
