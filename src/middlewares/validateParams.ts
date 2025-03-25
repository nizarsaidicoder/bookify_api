import { Request, Response, NextFunction } from "express";
import { assert } from "superstruct";
import { ReqParams } from "../validation/params";

export const validateParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
{
  assert(req.params, ReqParams);
  next();
};
