import { logincontroller } from "../Controller/index.js";
import { getAuth } from "../Middleware/auth.js";

export const userRouter = (router) => {
  console.log("HELLO");
  router.post("/user/signIn", logincontroller);
  router.get("/check", getAuth);
};
