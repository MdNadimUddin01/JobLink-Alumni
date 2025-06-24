import {
  adminRouter,
  alumniRouter,
  eventRouter,
  userRouter,
} from "./Router/index.js";

export const RouterA = (router) => {
  console.log("Router is here");
  adminRouter(router);
  userRouter(router);
  alumniRouter(router);
  eventRouter(router);
};
