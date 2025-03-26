import express from "express";
import * as book from "@handlers/book";
import { validateParams } from "../middlewares/validateParams";

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     responses:
 *       200:
 *         description: A list of books.
 */
router.get("/books", book.getAll);

/**
 * @swagger
 * /authors/{author_id}/books:
 *   post:
 *     summary: Create a book for an author
 *     description: Add a new book for a specific author.
 *     parameters:
 *       - in: path
 *         name: author_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       201:
 *         description: Book created successfully.
 *   get:
 *     summary: Get all books of an author
 *     description: Retrieve all books written by a specific author.
 *     parameters:
 *       - in: path
 *         name: author_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: A list of books by the author.
 */
router
  .route("/authors/:author_id/books")
  .all(validateParams)
  .post(book.createOneOfAuthor)
  .get(book.getAllOfAuthor);

/**
 * @swagger
 * /books/{book_id}:
 *   patch:
 *     summary: Update a book
 *     description: Update details of a specific book.
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *   delete:
 *     summary: Delete a book
 *     description: Remove a specific book from the database.
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *   get:
 *     summary: Get a book
 *     description: Retrieve details of a specific book.
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Details of the book.
 */
router
  .route("/books/:book_id")
  .all(validateParams)
  .patch(book.updateOneOfAuthor)
  .delete(book.deleteOne)
  .get(book.getOne);

export default router;
