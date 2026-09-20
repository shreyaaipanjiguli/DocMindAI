import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!authHeader || !token) {
  return res.status(401).json({
    message: "Authentication required"
  });
}

try {
 const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as { userId: string };

req.userId = decoded.userId;

next();
} catch (error) {
  return res.status(401).json({
    message: "Invalid or expired token"
  });
}
};

export default authMiddleware;