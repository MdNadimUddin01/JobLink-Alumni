import { logincontroller } from "../Controller/index.js";
import { getAuth } from "../Middleware/auth.js";

export const userRouter = (router) => {
  router.post("/user/signIn", logincontroller);
};
