import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: payload.id };

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default authMiddleware;
