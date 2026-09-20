import authMiddleware from "../middleware/auth.middleware";
import { Router } from "express";
import { createUser, findUserByEmail } from "../config/userQueries";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/register",async (req, res) => {
     try {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, passwordHash);
  res.json({
    message: "Registration successful!",
    name,
    email
  });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

   const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET as string,
  { expiresIn: "1h" }
);

res.json({
  message: "Login successful!",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email
  }
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated!",
    userId: req.userId
  });
});


export default router;