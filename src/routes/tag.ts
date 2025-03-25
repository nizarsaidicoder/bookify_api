import express from "express";
import * as tag from "@handlers/tags";
import { validateParams } from "../middlewares/validateParams";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Tags
 *     description: Operations related to tags
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the tag
 *                 example: "Science"
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.route("/tags").get(tag.getAll).post(tag.createOne);

/**
 * @swagger
 * /books/{book_id}/tags:
 *   get:
 *     summary: Get tags for a specific book
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: A list of tags for the specified book
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:book_id/tags", validateParams, tag.getOnesOfBook);

/**
 * @swagger
 * /tags/{tag_id}:
 *   get:
 *     summary: Get a specific tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: The tag details
 *       400:
 *         description: Invalid tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update a specific tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       400:
 *         description: Invalid input or tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a specific tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag
 *     responses:
 *       204:
 *         description: Tag deleted successfully
 *       400:
 *         description: Invalid tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
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
 *     summary: Update a tag for a specific book
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: Tag updated successfully for the book
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book or tag not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Remove a tag from a specific book
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: book_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *       - in: path
 *         name: tag_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the tag
 *     responses:
 *       200:
 *         description: Tag removed successfully from the book
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book or tag not found
 *       500:
 *         description: Internal server error
 */
router
  .route("/books/:book_id/tags/:tag_id")
  .all(validateParams)
  .post(tag.updateOneOfBook)
  .delete(tag.deleteOneOfBook);

export default router;
