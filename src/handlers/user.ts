import { Request, Response, NextFunction } from "express";
import { prisma } from "../db";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { assert } from "superstruct";
import { UserConnexionData, UserCreationData } from "@validation/user";
import bcrypt from "bcryptjs";
import validator from "validator";
import * as jwt from "jsonwebtoken";
import { expressjwt, Request as AuthRequest } from "express-jwt";

//POST /signup : crée un nouvel utilisateur

export async function signup(req: Request, res: Response)
{
  assert(req.body, UserCreationData);
  const email: string = req.body.email;
  const username: string = req.body.username;
  const password: string = req.body.password;

  if (password.length < 8)
  {
    throw new HttpError("Password must be at least 8 characters long", 400);
  }

  if (!validator.isEmail(email))
  {
    throw new HttpError("Invalid email", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try
  {
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002")
    {
      throw new HttpError("Email or username already exists", 400);
    }
    throw err;
  }
}

// POST /signin : vérifie les informations d'identification d'un utilisateur et retourne un token d'authentification

export async function signin(req: Request, res: Response)
{
  assert(req.body, UserConnexionData);
  const username: string = req.body.username;
  const password: string = req.body.password;
  let user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user)
  {
    throw new NotFoundError("User not found");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
  {
    throw new HttpError("Invalid password", 400);
  }

  if (!process.env.JWT_SECRET)
  {
    throw new HttpError("JWT_SECRET is not defined", 500);
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Exclude password from response
  const { password: _, ...userWithoutPassword } = user;
  res.status(200).json({ user: userWithoutPassword, token });
}

export const auth_client = [
  expressjwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ["HS256"],
  }),
  async (req: AuthRequest, res: Response, next: NextFunction) =>
  {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.auth?.id) },
    });
    if (user)
    {
      req.auth = user;
      next();
    }
    else
    {
      res.status(401).send("Invalid token");
    }
  },
];
