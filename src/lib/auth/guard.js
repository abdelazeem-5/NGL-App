import AppError from "../error/error.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
const authGurad = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError("no token provided", 403);
    req.user = jwt.verify(token, env.jwt.secret);
    next();

  } catch (error) {
    next(error);
  }
}

export{
    authGurad
}