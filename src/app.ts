import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { HttpError } from "./error";
import { StructError } from "superstruct";
import { swaggerDocs } from "./config/swagger";
import ratingRoutes from "./routes/rating";
import commentRoutes from "./routes/comment";
import userRoutes from "./routes/user";
import tagRoutes from "./routes/tag";
import bookRoutes from "./routes/book";
import authorRoutes from "./routes/author";
import { prisma } from "./db";

const app = express();

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) =>
{
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Access-Control-Expose-Headers", "X-Total-Pages");
  next();
});
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerDocs);

// Mount Routes
app.use(ratingRoutes);
app.use(commentRoutes);
app.use(userRoutes);
app.use(tagRoutes);
app.use(bookRoutes);
app.use(authorRoutes);


// Default Route
app.get("/", (req: Request, res: Response) =>
{
  res.send("Hello");
});

// Error Handling Middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) =>
{
  if (err instanceof StructError)
  {
    res.status(400).send(err.message);
    return;
  }
  res.status(err.status ?? 500).send({ msg: err.message, status: err.status });
});

export default app;
