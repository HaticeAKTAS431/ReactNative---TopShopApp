// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const tokenWithoutBearer = token.slice(7); // "Bearer " öneki çıkarılır

  try {
    const secretKey = process.env.JWT_KEY || process.env.SECRET;
    const decoded = jwt.verify(tokenWithoutBearer, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };
