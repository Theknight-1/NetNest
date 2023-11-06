import jwt from "jsonwebtoken";
import asyncHanler from "express-async-handler";
export const verifyToken = asyncHanler(async (req, res, next) => {
  try {
    let token = res.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, "secretJWTtoken");
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
