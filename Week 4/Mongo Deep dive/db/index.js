const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://localhost:27017/mongoose-deep-dive")
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch(() => {
    console.log("FAILED TO CONNECT");
  });

module.exports = db;
