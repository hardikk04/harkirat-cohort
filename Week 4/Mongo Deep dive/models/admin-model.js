const mongoose = require("mongoose");


const adminSchema = mongoose.Schema({
  name: String,
  password: String,
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
