import { Request, Response } from "express";
import { prisma } from "../db";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { assert } from "superstruct";
import { CommentCreationData } from "@validation/comment";
import { Request as AuthRequest } from "express-jwt";

// GET /books/:book_id/comments : retourne la liste des commentaires associés au livre dont l'identifiant est :book_id
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
        comments: true,
      },
    });
    if (!book)
    {
      throw new NotFoundError("Book not found");
    }
    res.status(200).json(book.comments);
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

// POST /books/:book_id/comments : crée un nouveau commentaire associé au livre dont l'identifiant est :book_id.
// Le propriétaire du commentaire est le User à l'origine de la requête (cette route nécessite un token d'authentification)

export async function createOneOfBook(req: Request, res: Response)
{
  assert(req.body, CommentCreationData);
  try
  {
    const book_id: number = parseInt(req.params.book_id.toString());

    // Vérifier si le livre existe
    const book = await prisma.book.findUnique({
      where: { id: book_id },
      include: { comments: true },
    });

    if (!book)
    {
      throw new NotFoundError("Book not found");
    }

    const content: string = req.body.content;

    const user_id = (req as AuthRequest).auth?.id;
    if (!user_id)
    {
      res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content,
        bookId: book_id,
        userId: user_id,
      },
    });

    res.status(201).json(comment);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(500).json({ message: "Internal server error", error: err });
  }
}

// PATCH /comments/:comment_id : met à jour le commentaire dont l'identifiant est :comment_id. Vérifie que le propriétaire du commentaire est bien le User à l'origine de la requête (cette route nécessite un token d'authentification)

export async function updateOneOfUser(req: Request, res: Response)
{
  assert(req.body, CommentCreationData);
  try
  {
    const content: string = req.body.content;

    const user_id = (req as AuthRequest).auth?.id;
    if (!user_id)
    {
      res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await prisma.comment.update({
      where: {
        id: parseInt(req.params.comment_id.toString()),
      },
      data: {
        content: content,
      },
    });
    // check if the user is the owner of the comment
    if (comment.userId !== user_id)
    {
      res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json(comment);
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      res.status(404).json({ message: "Comment not found" });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
}

// DELETE /comments/:comment_id : supprime le commentaire dont l'identifiant est :comment_id. Vérifie que le propriétaire du commentaire est bien le User à l'origine de la requête (cette route nécessite un token d'authentification)
export async function deleteOneOfUser(req: Request, res: Response)
{
  try
  {
    const user_id = (req as AuthRequest).auth?.id;
    if (!user_id)
    {
      res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await prisma.comment.findFirst({
      where: {
        id: parseInt(req.params.comment_id.toString()),
      },
    });
    if (!comment)
    {
      throw new NotFoundError("Comment not found");
    }
    // check if the user is the owner of the comment
    if (comment.userId !== user_id)
    {
      res.status(401).json({ message: "Unauthorized" });
    }
    await prisma.comment.delete({
      where: {
        id: parseInt(req.params.comment_id.toString()),
      },
    });
    res.status(204).end();
  }
  catch (err: unknown)
  {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025")
    {
      res.status(404).json({ message: "Book not found" });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
}
