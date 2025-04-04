import { Request, Response } from "express";
import { prisma } from "../db";
import { HttpError, NotFoundError } from "../error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TagUpdateData, TagCreationData } from "@validation/tag";
import { assert } from "superstruct";

export async function getAll(req: Request, res: Response)
{
  try
  {
    const tags = await prisma.tag.findMany();
    res.status(200).json(tags);
  }
  catch (error)
  {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOne(req: Request, res: Response)
{
  try
  {
    const tag_id = parseInt(req.params.tag_id);
    if (isNaN(tag_id))
    {
      throw new HttpError("Invalid tag ID", 400);
    }

    const tag = await prisma.tag.findUnique({ where: { id: tag_id } });

    if (!tag)
    {
      throw new NotFoundError("Tag not found");
    }

    res.status(200).json(tag);
  }
  catch (error: unknown)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      res.status(404).json({ error: "Tag not found" });
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function getOnesOfBook(req: Request, res: Response)
{
  try
  {
    const book_id = parseInt(req.params.book_id);
    if (isNaN(book_id))
    {
      throw new HttpError("Invalid book ID", 400);
    }

    const book = await prisma.book.findUnique({
      where: { id: book_id },
      include: { tags: true },
    });

    if (!book)
    {
      throw new NotFoundError("Book not found");
    }

    res.status(200).json(book.tags);
  }
  catch (error: unknown)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      res.status(404).json({ error: "Book not found" });
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function createOne(req: Request, res: Response)
{
  assert(req.body, TagCreationData);
  try
  {
    const tag = await prisma.tag.create({ data: { name: req.body.name } });

    res.status(201).json(tag);
  }
  catch (error: unknown)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    )
    {
      throw new HttpError("A tag with that name already exists", 400);
    }
    else
    {
      throw new HttpError("Internal server error", 500);
    }
  }
}

export async function updateOne(req: Request, res: Response)
{
  assert(req.body, TagUpdateData);
  try
  {
    const tag_id = parseInt(req.params.tag_id);
    if (isNaN(tag_id))
    {
      throw new HttpError("Invalid tag ID", 400);
    }

    const tag = await prisma.tag.update({
      where: { id: tag_id },
      data: { name: req.body.name },
    });

    res.status(200).json(tag);
  }
  catch (error)
  {
    if (error instanceof PrismaClientKnownRequestError)
    {
      if (error.code === "P2025")
      {
        res.status(404).json({ error: "Tag not found" });
      }
      else if (error.code === "P2002")
      {
        res.status(400).json({ error: "A tag with that name already exists" });
      }
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function deleteOne(req: Request, res: Response)
{
  try
  {
    const tag_id = parseInt(req.params.tag_id);
    if (isNaN(tag_id))
    {
      throw new HttpError("Invalid tag ID", 400);
    }

    await prisma.tag.delete({ where: { id: tag_id } });

    res.status(204).send();
  }
  catch (error)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      res.status(404).json({ error: "Tag not found" });
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function updateOneOfBook(req: Request, res: Response)
{
  try
  {
    const book_id = parseInt(req.params.book_id);
    const tag_id = parseInt(req.params.tag_id);
    if (isNaN(book_id) || isNaN(tag_id))
    {
      throw new HttpError("Invalid book or tag ID", 400);
    }

    const book = await prisma.book.update({
      where: { id: book_id },
      data: { tags: { connect: [{ id: tag_id }] } },
      include: { tags: true },
    });

    res.status(200).json(book);
  }
  catch (error)
  {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    )
    {
      res.status(404).json({ error: "Book or tag not found" });
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export async function deleteOneOfBook(req: Request, res: Response)
{
  try
  {
    const book_id = parseInt(req.params.book_id);
    const tag_id = parseInt(req.params.tag_id);
    if (isNaN(book_id) || isNaN(tag_id))
    {
      throw new HttpError("Invalid book or tag ID", 400);
    }

    const book = await prisma.book.update({
      where: { id: book_id },
      data: { tags: { disconnect: [{ id: tag_id }] } },
      include: { tags: true },
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
      res.status(404).json({ error: "Book or tag not found" });
    }
    else
    {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
