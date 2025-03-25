import express from "express";
import * as user from "@handlers/user";

const router = express.Router();
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with a username, email, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email/username already exists
 *       500:
 *         description: Internal server error
 */
router.post("/signup", user.signup);

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in with username and password
 *     description: Sign in a user by providing username and password, returns a JWT token if successful
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
 *         description: User signed in successfully with JWT token
 *       400:
 *         description: Invalid credentials or missing data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/signin", user.signin);

export default router;
