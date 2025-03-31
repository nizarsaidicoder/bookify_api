import { Request, Response } from "express";
import { prisma } from "../db";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { assert } from "superstruct";
import { RatingCreationData } from "@validation/rating";
import { Request as AuthRequest } from "express-jwt";
import { updateBookAvgRating } from "./book";

export async function getAllOfBook(req: Request, res: Response)
{
  try
  {
    let book_id: number;
    if (!req.params.book_id)
    {
      throw new HttpError("Book ID is missing", 400);
    }
    book_id = parseInt(req.params.book_id.toString());

    const book = await prisma.book.findFirst({
      where: {
        id: book_id,
      },
      include: {
        rating: true,
      },
    });
    if (!book)
    {
      throw new NotFoundError("Book not found");
    }
    res.status(200).json(book.rating);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Book not found");
    }
    throw new HttpError("Internal server error", 500);
  }
}

// POST /books/:book_id/ratings : crée une nouvelle note associée au livre dont l'identifiant est :book_id. Le propriétaire de la note est le User à l'origine de la requête (cette route nécessite un token d'authentification)
export async function createOneOfBook(req: Request, res: Response)
{
  assert(req.body, RatingCreationData);
  console.log(req.body);
  try
  {
    const book_id: number = parseInt(req.params.book_id.toString());
    const book = await prisma.book.findUnique({
      where: { id: book_id },
      include: { rating: true },
    });

    if (!book)
    {
      throw new NotFoundError("Book not found");
    }
    const user_id = (req as AuthRequest).auth?.id;

    if (!user_id)
    {
      throw new HttpError("Unauthorized", 401);
    }

    const rating = req.body.rating;
    const newRating = await prisma.rating.create({
      data: {
        value: rating,
        bookId: book_id,
        userId: user_id,
      },
    });
    // Update the book's average rating
    updateBookAvgRating(book_id);
    res.status(201).json(newRating);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Book not found");
    }
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002")
    {
      throw new HttpError("You have already rated this book", 400);
    }
    console.error(err);
    throw new HttpError("Internal server error", 500);
  }
}

// PATCH /ratings/:rating_id : met à jour la note dont l'identifiant est :rating_id. Vérifie que le propriétaire de la note est bien le User à l'origine de la requête (cette route nécessite un token d'authentification)
export async function updateOneOfUser(req: Request, res: Response)
{
  assert(req.body, RatingCreationData);
  try
  {
    const user_id = (req as AuthRequest).auth?.id;

    if (!user_id)
    {
      throw new HttpError("Unauthorized", 401);
    }

    const rating = req.body.rating;
    const rating_id: number = parseInt(req.params.rating_id.toString());
    const oldRating = await prisma.rating.findUnique({
      where: { id: rating_id },
      include: {
        book: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!oldRating)
    {
      throw new NotFoundError("Rating not found");
    }
    if (oldRating.userId !== user_id)
    {
      throw new HttpError("Forbidden", 403);
    }
    const newRating = await prisma.rating.update({
      where: { id: rating_id },
      data: { value: rating },
    });
    updateBookAvgRating(oldRating.book.id);
    res.status(200).json(newRating);
    // Update the book's average rating
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Rating not found");
    }
    console.error(err);
    throw new HttpError("Internal server error", 500);
  }
}

// DELETE /ratings/:rating_id : supprime le commentaire dont l'identifiant est :rating_id. Vérifie que le propriétaire de la note est bien le User à l'origine de la requête (cette route nécessite un token d'authentification)
export async function deleteOneOfBook(req: Request, res: Response)
{
  try
  {
    const rating_id: number = parseInt(req.params.rating_id.toString());
    const rating = await prisma.rating.findUnique({
      where: { id: rating_id },
    });
    if (!rating)
    {
      throw new NotFoundError("Rating not found");
    }
    const user_id = (req as AuthRequest).auth?.id;
    if (!user_id)
    {
      throw new HttpError("Unauthorized", 401);
    }
    if (rating.userId !== user_id)
    {
      throw new HttpError("Forbidden", 403);
    }
    await prisma.rating.delete({
      where: { id: rating_id },
    });
    // Update the book's average rating
    const book_id = rating.bookId;
    updateBookAvgRating(book_id);
    res.status(204).end();
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      throw new NotFoundError("Rating not found");
    }
    throw new HttpError("Internal server error", 500);
  }
}
