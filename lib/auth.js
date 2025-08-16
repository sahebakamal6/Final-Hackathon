import jwt from "jsonwebtoken";

const SECRET = "your-secret-key";

export const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
