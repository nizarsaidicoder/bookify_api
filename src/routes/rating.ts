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
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of ratings for the book
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *       404:
 *         description: Book not found
 */
router.get("/books/:book_id/ratings", validateParams, rating.getAllOfBook);

/**
 * @swagger
 * /books/{book_id}/ratings:
 *   post:
 *     summary: Create a new rating for a book
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Invalid input or already rated
 *       401:
 *         description: Unauthorized
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
 *     summary: Update a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: rating_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the owner of the rating)
 *       404:
 *         description: Rating not found
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
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: rating_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Rating deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not the owner of the rating)
 *       404:
 *         description: Rating not found
 */
router.delete(
  "/ratings/:rating_id",
  validateParams,
  user.auth_client,
  rating.deleteOneOfBook,
);

/**
 * @swagger
 * /books/{book_id}/ratings/average:
 *   get:
 *     summary: Get the average rating of a book
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Average rating of the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Book not found
 */
router.get(
  "/books/:book_id/ratings/average",
  validateParams,
  rating.getAverageOfBook,
);

export default router;
