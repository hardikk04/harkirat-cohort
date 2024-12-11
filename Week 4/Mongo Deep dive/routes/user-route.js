const express = require("express");
const userModel = require("../models/user-model");
const courseModel = require("../models/course-model");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/index");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  const user = await userModel.findOne({ name });
  if (user) {
    return res.send("User already exists");
  } else {
    const newUser = await userModel.create({
      name,
      password,
    });
    const token = jwt.sign({ name }, "shhhh");
    res.cookie("token", token);
    res.send(newUser);
  }
});

router.get("/courses", userMiddleware, async (req, res) => {
  const allCourse = await courseModel.find({});

  res.send(allCourse);
});

router.post("/courses/:id", userMiddleware, async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ name: req.name });
  user.coursePurchased.push(id);
  await user.save();
  res.send(user);
});

module.exports = router;
