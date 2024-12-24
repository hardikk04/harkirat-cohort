const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
