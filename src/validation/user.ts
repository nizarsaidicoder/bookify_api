import { object, string, size, optional, enums, integer } from "superstruct";

export const UserCreationData = object({
  email: size(string(), 1, 60),
  username: size(string(), 1, 50),
  password: size(string(), 8, 50),
});

export const UserConnexionData = object({
  username: size(string(), 1, 50),
  password: size(string(), 8, 50),
});
