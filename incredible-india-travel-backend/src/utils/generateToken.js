import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "incredible_india_secret";
  return jwt.sign({ id }, secret, {
    expiresIn: "7d",
  });
};

