const express = require("express");
const { isLoggedIn } = require("../middlewares/authentication");
const accountModel = require("../models/user-account-model");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", isLoggedIn, async (req, res) => {
  try {
    const user = await accountModel.findOne({ userId: req.user.id });

    res.status(200).json({
      balance: user.balance,
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while updating",
    });
  }
});

router.post("/tranfer", isLoggedIn, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    const sender = await accountModel.findOne({ userId: req.user.id });
    console.log(sender);

    if (sender.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const reciver = await accountModel.findOne({ userId: to });
    console.log(reciver);

    if (!reciver) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid Account",
      });
    }

    await accountModel.updateOne(
      {
        userId: req.user.id,
      },
      {
        $inc: {
          balance: -amount,
        },
      }
    );

    await accountModel.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      }
    );

    await session.commitTransaction();

    res.json({ message: "Tranfer successful" });
  } catch (error) {
    res.status(411).json({
      message: "Error while updating",
    });
  }
});

module.exports = router;
