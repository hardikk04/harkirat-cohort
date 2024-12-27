const express = require("express");

const userRouter = require("./user-route");

const router = express.Router();

// handling routes
router.use("/user", userRouter);

module.exports = router;
