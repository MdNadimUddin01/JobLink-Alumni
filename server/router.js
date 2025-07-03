import {
  adminEventRouter,
  adminRouter,
  alumniJobRouter,
  alumniRouter,
  userEventRouter,
  userRouter,
} from "./Router/index.js";

export const RouterA = (router) => {
  adminRouter(router);
  userRouter(router);
  alumniRouter(router);
  adminEventRouter(router);
  userEventRouter(router);
  alumniJobRouter(router);
};