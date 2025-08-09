import {
  alumniEmailVerify,
  alumniSignupController,
  getAlumniInfo,
} from "../Controller/index.js";

export const alumniRouter = (router) => {
  router.route("/alumni/signUp").post(alumniSignupController);
  router.route("/alumni/verifyEmail").get(alumniEmailVerify);
  router.route("/getAlumniData").post(getAlumniInfo)
};
