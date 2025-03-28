import {
  object,
  string,
  size,
  optional,
  enums,
  refine,
  partial,
} from "superstruct";
import { isInt } from "validator";

const DateFromString = refine(string(), "DateFromString", (value) =>
{
  const parsedDate = new Date(value);
  return !isNaN(parsedDate.getTime()); // Valid date check
});

export const AuthorCreationData = object({
  firstname: size(string(), 1, 50),
  lastname: size(string(), 1, 50),
  birthDate: optional(DateFromString),
  deathDate: optional(DateFromString),
  bio: optional(size(string(), 0, 500)),
  image: optional(size(string(), 0, 500)),
});

export const AuthorUpdateData = partial(AuthorCreationData);

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
