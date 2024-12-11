const mongoose = require("mongoose");

const db = mongoose
  .connect(`${process.env.MONGODB_URI}/harkirat`)
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((err) => {
    console.log("DB CONNECTION FAILED");
  });

module.exports = db;
