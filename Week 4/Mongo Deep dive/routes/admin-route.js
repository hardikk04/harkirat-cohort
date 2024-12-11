const express = require("express");
const adminModel = require("../models/admin-model");
const courseModel = require("../models/course-model");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/index");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  const admin = await adminModel.findOne({ name });
  if (admin) {
    return res.send("already exisit");
  } else {
    const newAdmin = await adminModel.create({
      name,
      password,
    });
    const token = jwt.sign({ name }, "shhhh");
    res.cookie("token", token);

    res.send(newAdmin);
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { name, price } = req.body;
  const course = await courseModel.create({
    name,
    price,
  });
  res.send(course);
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await courseModel.find({});
  res.send(allCourses);
});

module.exports = router;
