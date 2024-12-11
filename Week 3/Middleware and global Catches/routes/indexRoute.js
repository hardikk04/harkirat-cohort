const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send("user not found");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ email }, process.env.JWT_SECRECT);
        res.cookie("token", token);

        res.render("home", { name: user.name });
      } else {
        result.send("wrong password");
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.send("user already exist");
    }

    bcrypt.hash(password, 12, async (err, hash) => {
      const newUser = await userModel.create({
        name,
        email,
        password: hash,
      });
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRECT);
    res.cookie("token", token);

    res.render("home", { name });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
