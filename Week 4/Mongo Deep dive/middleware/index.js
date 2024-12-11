const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin-model");
const userModel = require("../models/user-model");

const adminMiddleware = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) {
        res.send("you're not admin");
      } else {
        req.name = decoded.name;
        console.log(req.name);

        next();
      }
    });
  } else {
    res.send("you're not admin");
  }
};

const userMiddleware = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) {
        res.send("you're not user");
        console.log("false");
      } else {
        console.log("true");

        req.name = decoded.name;
        console.log(req.name);

        next();
      }
    });
  } else {
    res.send("you're not user");
  }
};

module.exports = { adminMiddleware, userMiddleware };
