const express = require("express");
const bcrypt = require("bcrypt");

const {
  signupValidation,
  signinValidation,
} = require("../utils/zod-validation");
const { getJwtToken } = require("../utils/jwt-generete");
const userModel = require("../models/user-model");
const { isLoggedIn } = require("../middlewares/authentication");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;
    const validationResult = signupValidation({
      username,
      firstName,
      lastName,
      password,
    });

    if (!validationResult) {
      return res.status(411).json({
        message: "Email already taken / Incoorect inputs",
      });
    }

    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(411).json({
        message: "Email already taken / Incoorect inputs",
      });
    }

    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        return res.status(411).json({
          message: "An error occurred while hashing the password",
        });
      } else {
        const user = await userModel.create({
          username,
          firstName,
          lastName,
          password: hash,
        });

        const token = getJwtToken(username);
        res.cookie("token", token);

        return res.status(200).json({
          message: "User created successfully",
        });
      }
    });
  } catch (error) {
    res.status(411).json({
      message: "Email already taken / Incoorect inputs",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const validationResult = signinValidation({ username, password });
    if (!validationResult) {
      return res.status(411).json({
        message: "Validation failed",
      });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = getJwtToken(username);
        res.cookie("token", token);
        return res.status(200).json({
          message: "User logged in successfully",
        });
      } else {
        return res.status(411).json({
          message: "Error while logging in",
        });
      }
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

router.get("/check", isLoggedIn, (req, res) => {
  res.send("welcome");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = router;
