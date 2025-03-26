import { Request, Response } from "express";
import { prisma } from "../db";
import { Prisma } from "@prisma/client";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  AuthorCreationData,
  AuthorQueryData,
  AuthorUpdateData,
} from "@validation/author";
import { assert } from "superstruct";

export async function updateOne(req: Request, res: Response)
{
  assert(req.body, AuthorUpdateData);
  try
  {
    const author_id: number = parseInt(req.params.author_id);
    const { firstname, lastname, bio, birthYear, deathYear, image } = req.body;

    const author = await prisma.author.update({
      where: {
        id: author_id,
      },
      data: {
        firstname,
        lastname,
        bio,
        birthDate: birthYear ? new Date(birthYear) : null,
        deathDate: deathYear ? new Date(deathYear) : null,
        image,
      },
    });
    res.status(201).json(author);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Author not found");
    }
    throw err;
  }
}

export async function deleteOne(req: Request, res: Response)
{
  try
  {
    const author_id: number = parseInt(req.params.author_id);
    if (isNaN(author_id))
    {
      throw new HttpError("Invalid author id", 400);
    }
    await prisma.author.delete({
      where: {
        id: author_id,
      },
    });
    res.status(204).send();
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Author not found");
    }
    throw err;
  }
}

export async function createOne(req: Request, res: Response)
{
  assert(req.body, AuthorCreationData);
  try
  {
    const { firstname, lastname, birthYear, deathYear, bio, image } = req.body;

    const exist = await prisma.author.findFirst({
      where: {
        firstname: firstname,
        lastname: lastname,
      },
    });
    if (exist)
    {
      throw new HttpError("Author already exists", 400);
    }
    if (birthYear && deathYear && birthYear > deathYear)
    {
      throw new HttpError("Invalid birth and death year", 400);
    }
    const birthDate = new Date(birthYear || 0);
    const deathDate = new Date(deathYear || 0);

    const author = await prisma.author.create({
      data: {
        firstname,
        lastname,
        birthDate,
        deathDate,
        bio: bio || null,
        image: image || null,
      },
    });
    res.json(author);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002")
    {
      throw new HttpError("Author already exists", 400);
    }
    throw err;
  }
}

export async function getOne(req: Request, res: Response)
{
  try
  {
    const author_id: number = parseInt(req.params.author_id);
    if (isNaN(author_id))
    {
      throw new HttpError("Invalid author id", 400);
    }
    const author = await prisma.author.findUnique({
      where: { id: author_id },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    // format the birth and death date to be year only
    if (author?.birthDate)
    {
      author.birthYear = author.birthDate.getFullYear();
    }
    if (author?.deathDate)
    {
      author.deathYear = author.deathDate.getFullYear
        ? author.deathDate.getFullYear()
        : null;
    }
    res.status(200).json(author);
  }
  catch (error: unknown)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      throw new NotFoundError("Author not found");
    }
    throw error;
  }
}
export async function getAll(req: Request, res: Response)
{
  assert(req.query, AuthorQueryData);
  try
  {
    const filterByFirstname: string | undefined =
      req.query.firstname?.toString();
    const filterByLastname: string | undefined = req.query.lastname?.toString();
    const hasSome: boolean = req.query.hasSome === "true";
    const includeBooks: boolean = req.query.includeBooks === "true";

    const sort = req.query.sortBy?.toString() || "firstname";
    const sortType = req.query.sortType?.toString();

    const filter: Prisma.AuthorWhereInput = {};

    if (filterByFirstname)
    {
      filter.firstname = { contains: filterByFirstname };
    }
    if (filterByLastname)
    {
      filter.lastname = { contains: filterByLastname };
    }
    if (hasSome)
    {
      filter.books = { some: {} };
    }

    const take = parseInt(req.query.take?.toString() || "10");
    const page = parseInt(req.query.page?.toString() || "1");
    if (page < 1)
    {
      throw new HttpError("Invalid page number", 400);
    }

    // Count total authors that match the filter
    const totalAuthors = await prisma.author.count({ where: filter });
    const totalPages = Math.ceil(totalAuthors / take);

    const authors = await prisma.author.findMany({
      take,
      skip: take * (page - 1),
      where: filter,
      orderBy: sort
        ? {
            [sort]: sortType || "asc",
          }
        : undefined,

      include: includeBooks
        ? {
            books: {
              select: {
                title: true,
                id: true,
              },
            },
          }
        : undefined,
    });

    res.setHeader("X-Total-Count", totalAuthors.toString());
    res.setHeader("X-Total-Pages", totalPages.toString());

    res.status(200).json(authors);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Author(s) not found");
    }
    throw err;
  }
}
