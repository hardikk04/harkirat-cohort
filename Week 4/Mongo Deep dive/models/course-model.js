const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: String,
  price: Number,
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
