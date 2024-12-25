const zod = require("zod");

const userSignupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signupValidation = (data) => {
  const result = userSignupSchema.safeParse(data);
  return result.success;
};

const userSigninSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const signinValidation = (data) => {
    const result = userSigninSchema.safeParse(data);
    return result.success;
  };

module.exports = { signupValidation, signinValidation };
