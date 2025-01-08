const jwt = require("jsonwebtoken");

// verify the token send sends next if the token is valid
const isLoggedIn = (req, res, next) => {
  console.log(req.query);
  
  try {
    if (req.body.token) {
      const token = req.body.token;
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
