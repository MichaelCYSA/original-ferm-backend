const jwt = require("jsonwebtoken");
const config = require("../../config.json");
cos+n
const authMiddleware = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status().json({ message: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.body.authorization = decoded;

    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized!" });
  }
};

module.exports = authMiddleware;
