import express from "express";
import * as comment from "@handlers/comment";
import * as user from "@handlers/user";
import { validateParams } from "../middlewares/validateParams";

const router = express.Router();

/**
 * @swagger
 * /books/{book_id}/comments:
 *   get:
 *     summary: Get all comments for a book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of comments
 *       400:
 *         description: Invalid parameters
 */
router.get("/books/:book_id/comments", validateParams, comment.getAllOfBook);

/**
 * @swagger
 * /books/{book_id}/comments:
 *   post:
 *     summary: Add a comment to a book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid parameters
 */
router.post(
  "/books/:book_id/comments",
  validateParams,
  user.auth_client,
  comment.createOneOfBook,
);

/**
 * @swagger
 * /comments/{comment_id}:
 *   patch:
 *     summary: Update a comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid parameters
 */
router.patch(
  "/comments/:comment_id",
  validateParams,
  user.auth_client,
  comment.updateOneOfUser,
);

/**
 * @swagger
 * /comments/{comment_id}:
 *   delete:
 *     summary: Delete a comment
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid parameters
 */
router.delete(
  "/comments/:comment_id",
  validateParams,
  user.auth_client,
  comment.deleteOneOfUser,
);

export default router;
