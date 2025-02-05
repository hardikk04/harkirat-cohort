import { z } from "zod";

const userSignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

interface UserSignup {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSignupValidation = (data: UserSignup) => {
  const result = userSignupSchema.safeParse(data);
  return result.success;
};

const userSigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});

interface UserSignin {
  username: string;
  password: string;
}

const userSigninValidation = (data: UserSignin) => {
  const result = userSigninSchema.safeParse(data);
  return result.success;
};

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

interface Todo {
  title: string;
  description: string;
}

const todoValidation = (data: Todo) => {
  const result = todoSchema.safeParse(data);
  return result.success;
};

export { userSignupValidation, userSigninValidation, todoValidation };
