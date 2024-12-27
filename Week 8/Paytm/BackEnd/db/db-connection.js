const mongoose = require("mongoose");

// DB connection
const db = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB");
  });

module.exports = db;
