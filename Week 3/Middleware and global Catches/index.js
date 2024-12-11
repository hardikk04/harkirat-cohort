const express = require("express");
require("dotenv").config();
const path = require("path");
require("./db/dbConnection");

const app = express();

// Routes import
const userRouter = require("./routes/indexRoute");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
