import express from "express";
import * as rating from "@handlers/rating";
import * as user from "@handlers/user";
import { validateParams } from "../middlewares/validateParams";

const router = express.Router();

/**
 * @swagger
 * /books/{book_id}/ratings:
 *   get:
 *     summary: Get all ratings of a book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of ratings
 *       400:
 *         description: Invalid parameters
 */
router.get("/books/:book_id/ratings", validateParams, rating.getAllOfBook);

/**
 * @swagger
 * /books/{book_id}/ratings:
 *   post:
 *     summary: Create a rating for a book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Invalid parameters
 */
router.post(
  "/books/:book_id/ratings",
  validateParams,
  user.auth_client,
  rating.createOneOfBook,
);

/**
 * @swagger
 * /ratings/{rating_id}:
 *   patch:
 *     summary: Update a user's rating
 *     parameters:
 *       - in: path
 *         name: rating_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       400:
 *         description: Invalid parameters
 */
router.patch(
  "/ratings/:rating_id",
  validateParams,
  user.auth_client,
  rating.updateOneOfUser,
);

/**
 * @swagger
 * /ratings/{rating_id}:
 *   delete:
 *     summary: Delete a rating of a book
 *     parameters:
 *       - in: path
 *         name: rating_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       400:
 *         description: Invalid parameters
 */
router.delete(
  "/ratings/:rating_id",
  validateParams,
  user.auth_client,
  rating.deleteOneOfBook,
);

export default router;
