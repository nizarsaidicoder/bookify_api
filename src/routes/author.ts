import express from "express";
import * as author from "@handlers/author";
import { validateParams } from "../middlewares/validateParams";

/**
 * Express router for handling author-related routes.
 *
 * @swagger
 * tags:
 *   name: Authors
 *   description: API endpoints for managing authors.
 *
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve a list of authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retrieve a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: A single author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found.
 *
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Author created successfully.
 *
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       404:
 *         description: Author not found.
 *
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *       404:
 *         description: Author not found.
 */
const router = express.Router();

router.route("/authors").post(author.createOne).get(author.getAll);
router
  .route("/authors/:author_id")
  .all(validateParams)
  .patch(author.updateOne)
  .delete(author.deleteOne)
  .get(author.getOne);

export default router;
