const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token expired" });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { isLoggedIn };
