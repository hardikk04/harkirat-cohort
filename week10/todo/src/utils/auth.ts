import jwt from "jsonwebtoken";

const isLoggedIn = (req: any, res: any, next: any) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, "shhhh", (err: any, decoded: any) => {
      if (err === null) {
        req.user = decoded;
        next();
      } else {
        res.clearCookie("token");
        return res.redirect("/");
      }
    });
  } else {
    return res.send("TOKEN INVAILD");
  }
};

export default isLoggedIn;
