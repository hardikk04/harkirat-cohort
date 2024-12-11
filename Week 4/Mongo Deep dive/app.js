const express = require("express");
require("./db/index");

const app = express();

const adminRoute = require("./routes/admin-route");
const userRoute = require("./routes/user-route");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("SERVER IS RUNNING ON 3000 PORT");
});
