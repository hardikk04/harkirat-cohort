// Libraries imports
const express = require("express");
const bcrypt = require("bcrypt");

// Files imports
const {
  signupValidation,
  signinValidation,
  userUpdateValidation,
} = require("../utils/zod-validation");
const { getJwtToken } = require("../utils/jwt-generete");
const userModel = require("../models/user-model");
const accountModel = require("../models/user-account-model");
const { isLoggedIn } = require("../middlewares/authentication");

const router = express.Router();

// It sign up the user after a successful validation checks
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

        await accountModel.create({
          userId: user._id,
          balance: 1 + Math.random() * 10000,
        });

        const token = getJwtToken(user._id);
        res.cookie("token", token);

        return res.status(200).json({
          message: "User created successfully",
          token,
        });
      }
    });
  } catch (error) {
    res.status(411).json({
      message: "Email already taken / Incoorect inputs",
    });
  }
});

// It sign in the user after a successful validation checks
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
    console.log(username, password);

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = getJwtToken(user._id);
        res.cookie("token", token);
        return res.status(200).json({
          message: "User logged in successfully",
          token,
        });
      } else {
        return res.status(411).json({
          message: "Username and password incorrect",
        });
      }
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

router.put("/update", isLoggedIn, async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;
    const validationResult = userUpdateValidation({
      username,
      firstName,
      lastName,
      password,
    });

    if (!validationResult) {
      return res.status(411).json({
        message: "User update details invalid",
      });
    }

    console.log(req.user.username);

    const user = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { username, firstName, lastName, password }
    );

    res.status(200).json({
      message: "Updated",
      user,
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while updating",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await userModel.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

// It logs out the user by clearing the token cookie
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = router;
