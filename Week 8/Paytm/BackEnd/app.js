// Libraries Imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Environment Variables Imports
require("dotenv").config();

// Database Connection
require("./db/db-connection");

// Routes Imports
const indexRouter = require("./routes/index-route");

const app = express();

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Middleware routes
app.use("/api/v1", indexRouter);


// Port listner
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
