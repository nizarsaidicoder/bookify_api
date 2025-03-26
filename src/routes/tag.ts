import express from "express";
import * as tag from "@handlers/tags";
import { validateParams } from "../middlewares/validateParams";

const router = express.Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     responses:
 *       200:
 *         description: A list of tags
 *   post:
 *     summary: Create a new tag
 *     responses:
 *       201:
 *         description: Tag created successfully
 */
router.route("/tags").get(tag.getAll).post(tag.createOne);

/**
 * @swagger
 * /books/{book_id}/tags:
 *   get:
 *     summary: Get all tags of a specific book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of tags for the book
 */
router.get("/books/:book_id/tags", validateParams, tag.getOnesOfBook);

/**
 * @swagger
 * /tags/{tag_id}:
 *   get:
 *     summary: Get a specific tag by ID
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: The requested tag
 *   patch:
 *     summary: Update a specific tag by ID
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *   delete:
 *     summary: Delete a specific tag by ID
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag
 *     responses:
 *       204:
 *         description: Tag deleted successfully
 */
router
  .route("/tags/:tag_id")
  .all(validateParams)
  .get(tag.getOne)
  .patch(tag.updateOne)
  .delete(tag.deleteOne);

/**
 * @swagger
 * /books/{book_id}/tags/{tag_id}:
 *   post:
 *     summary: Update a tag of a specific book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *   delete:
 *     summary: Delete a tag of a specific book
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tag
 *     responses:
 *       204:
 *         description: Tag deleted successfully
 */
router
  .route("/books/:book_id/tags/:tag_id")
  .all(validateParams)
  .post(tag.updateOneOfBook)
  .delete(tag.deleteOneOfBook);

export default router;
