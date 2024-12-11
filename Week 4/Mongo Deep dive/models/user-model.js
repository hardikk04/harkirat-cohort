const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  coursePurchased: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
