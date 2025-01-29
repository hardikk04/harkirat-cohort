import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  userSignupValidation,
  userSigninValidation,
  todoValidation,
} from "../utils/Validation";
import jwt from "jsonwebtoken";
import isLoggedIn from "../utils/auth";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/signup", async (req: any, res: any) => {
  try {
    const { username, password, lastName, firstName } = req.body;

    const ans = userSignupValidation({
      username,
      password,
      lastName,
      firstName,
    });

    if (!ans) {
      return res.status(401).send("Invaild inputs");
    }

    const exist = await prisma.user.findFirst({
      where: { username },
    });

    if (exist) {
      return res.status(401).send("Account already exists");
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        lastName,
        firstName,
      },
    });

    const token = jwt.sign({ username }, "shhhh");
    res.cookie("token", token);

    res.status(200).send({ message: "USER HAS CREATED", user });
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.post("/signin", async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const ans = userSigninValidation({ username, password });
    if (!ans) {
      return res.status(401).send("INVAILD INPUTS");
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return res.status(401).send("USER DOES NOT EXISTS");
    }

    if (user.password === password) {
      const token = jwt.sign({ username }, "shhhh");
      res.cookie("token", token);

      return res.status(200).send({
        message: "USER HAS LOGGED IN",
        user,
      });
    } else {
      return res.status(401).send("WRONG PASSWORD");
    }
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.post("/todo", isLoggedIn, async (req: any, res: any) => {
  try {
    const { title, description, userId } = req.body;

    const ans = todoValidation({ title, description });

    if (!ans) {
      return res.status(401).send("WRONG INPUTS IN TODO");
    }

    const user = await prisma.user.findFirst({
      where: { username: req.user.username },
    });

    if (!user) {
      return res.status(401).send("USER NOT FOUND | TRY AGAIN LATER");
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: user?.id,
      },
    });
    res.send(todo);
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.get("/alltodos", isLoggedIn, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username: req.user.username },
    });

    if (!user) {
      res.status(401).send("TRY AGAIN LATER");
    }

    const todos = await prisma.todo.findMany({
      where: { userId: user?.id },
    });
    res.status(201).send({
      message: "TODOS",
      todos,
    });
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.get("/usertodo", isLoggedIn, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username: req.user.username },
    });

    if (!user) {
      res.status(401).send("TRY AGAIN LATER");
    }

    const todos = await prisma.todo.findMany({
      where: { userId: user?.id },
      select: {
        title: true,
        description: true,
        user: true,
      },
    });
    res.status(201).send({
      message: "TODOS",
      todos,
    });
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.get("/all", isLoggedIn, async (req: any, res: any) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(201).send({
      message: "TODOS",
      todos,
    });
  } catch (error) {
    console.log("ERROR : ", error);
  }
});

router.get("/logout", (req: any, res: any) => {
  req.cookies.token("");
});

export default router;
