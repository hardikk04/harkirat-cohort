import express from "express";
import homeRoute from "./routes/index-route";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", homeRoute);

app.listen(3000, () => {
  console.log("SERVER IS RUNNING ON 3000");
});
