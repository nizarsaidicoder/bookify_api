import express from "express";
import * as author from "@handlers/author";
import * as book from "@handlers/book";
import * as comment from "@handlers/comment";
import * as user from "@handlers/user";
import { validateParams } from "../middlewares/validateParams";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         bio:
 *           type: string
 *           nullable: true
 *         birthYear:
 *           type: integer
 *           nullable: true
 *         deathYear:
 *           type: integer
 *           nullable: true
 *         image:
 *           type: string
 *           nullable: true
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         authorId:
 *           type: integer
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         bookId:
 *           type: integer
 *         userId:
 *           type: integer
 */

/**
 * @swagger
 * /books/{book_id}/comments:
 *   get:
 *     summary: Get all comments for a book
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/books/:book_id/comments", validateParams, comment.getAllOfBook);

/**
 * @swagger
 * /books/{book_id}/comments:
 *   post:
 *     summary: Create a comment for a book
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
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
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       401:
 *         description: Unauthorized
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
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/comments/:comment_id",
  validateParams,
  user.auth_client,
  comment.deleteOneOfUser,
);

export default router;
