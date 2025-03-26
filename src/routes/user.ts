import express from "express";
import * as user from "@handlers/user";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Unauthorized
 */

const router = express.Router();

router.post("/signup", user.signup);
router.post("/signin", user.signin);

export default router;
