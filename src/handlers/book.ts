import { Request, Response } from "express";
import { prisma } from "../db";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { assert } from "superstruct";
import {
  BookCreationData,
  BookQueryData,
  BookUpdateData,
} from "@validation/book";
import { Prisma } from "@prisma/client";

export async function createOneOfAuthor(req: Request, res: Response)
{
  assert(req.body, BookCreationData);
  try
  {
    const author_id: number = parseInt(req.params.author_id);
    const title: string = req.body.title;
    const publicationYear: number | undefined =
      req.body.publicationYear || undefined;

    if (!publicationYear)
    {
      throw new HttpError("Publication year is missing", 400);
    }
    if (isNaN(publicationYear))
    {
      throw new HttpError("Publication year is not a number", 400);
    }
    if (!author_id)
    {
      throw new HttpError("Author ID is missing", 400);
    }
    const book = await prisma.book.create({
      data: {
        title: title,
        publicationYear: publicationYear,
        author: {
          connect: {
            id: author_id,
          },
        },
      },
      include: {
        author: true,
      },
    });
    res.json(book);
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

export async function getAllOfAuthor(req: Request, res: Response)
{
  assert(req.query, BookQueryData);
  try
  {
    const author_id: number = parseInt(req.params.author_id);

    if (!author_id)
    {
      throw new HttpError("Data is missing", 400);
    }
    const page = parseInt(req.query.page?.toString() || "1");
    const take = parseInt(req.query.take?.toString() || "10");
    const author = await prisma.author.findUnique({
      where: {
        id: author_id,
      },
      include: {
        _count: {
          select: { books: true },
        },
        books: {
          skip: take * (page - 1),
          take: take,
          orderBy: {
            title: "asc",
          },
        },
      },
    });

    if (!author)
    {
      throw new NotFoundError("Author not found");
    }
    if (author.books.length === 0)
    {
      res.status(200).json({ msg: "Author have no books" });
    }
    else
    {
      res.setHeader("X-Total-Count", author?._count?.books.toString() || "0");
      res.status(200).json(author.books);
    }
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

export async function updateOneOfAuthor(req: Request, res: Response)
{
  assert(req.body, BookUpdateData);
  try
  {
    // Validate the request body against the BookUpdateData schema
    const bookId = parseInt(req.params.book_id);
    const { title } = req.body;
    const publicationYear = req.body.publicationYear || undefined;

    const data: Prisma.BookUpdateInput = {};
    if (title !== undefined) data.title = title;
    if (publicationYear !== undefined) data.publicationYear = publicationYear;

    const book = await prisma.book.update({
      where: { id: bookId },
      data,
    });
    res.json(book);
  }
  catch (err)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Book not found");
    }
    throw err;
  }
}

export async function deleteOne(req: Request, res: Response)
{
  try
  {
    const book_id: number = parseInt(req.params.book_id);
    if (!book_id)
    {
      throw new HttpError("Invalid book id", 400);
    }
    await prisma.book.delete({
      where: {
        id: book_id,
      },
    });
    res.status(204).send("Book deleted");
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Book not found");
    }
    throw err;
  }
}

export async function getOne(req: Request, res: Response)
{
  try
  {
    const book_id: number = parseInt(req.params.book_id);
    if (!book_id)
    {
      throw new HttpError("Invalid book id", 400);
    }
    const book = await prisma.book.findUnique({
      where: { id: book_id },
    });

    res.status(200).json(book);
  }
  catch (error: unknown)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      throw new NotFoundError("Book not found");
    }
    throw error;
  }
}

export async function getAll(req: Request, res: Response)
{
  assert(req.query, BookQueryData);
  try
  {
    const filterByTitle: string | undefined = req.query.title?.toString();
    const filter: Prisma.BookWhereInput = {};

    if (filterByTitle)
    {
      filter.title = {
        contains: filterByTitle,
      };
    }

    const page = parseInt(req.query.page?.toString() || "1");
    const take: number = parseInt(req.query.take?.toString() || "10");
    const include: string | undefined = req.query.include?.toString();
    const assoc: Prisma.BookInclude = {
      _count: true,
    };
    if (include === "authors")
    {
      assoc.author = true;
    }

    // Count total books that match the filter
    const totalBooks = await prisma.book.count({ where: filter });
    const totalPages = Math.ceil(totalBooks / take);

    const books = await prisma.book.findMany({
      where: filter,
      take,
      skip: take * (page - 1),
      orderBy: {
        title: "asc",
      },
      include: assoc,
    });

    res.setHeader("X-Total-Count", totalBooks.toString());
    res.setHeader("X-Total-Pages", totalPages.toString());

    if (books.length === 0)
    {
      res.status(200).json({ msg: "No books found" });
    }
    else
    {
      res.status(200).json(books);
    }
  }
  catch (err)
  {
    console.error("Error fetching books:", err);
    res
      .status(500)
      .json({ error: "An unexpected error occurred while fetching books." });
  }
}
