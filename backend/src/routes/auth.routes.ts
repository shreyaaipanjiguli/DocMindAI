import { Router } from "express";
import { createUser } from "../config/userQueries";
import bcrypt from "bcryptjs";
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


export default router;