import pool from "./database";

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string
) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );

  return result.rows[0];
};