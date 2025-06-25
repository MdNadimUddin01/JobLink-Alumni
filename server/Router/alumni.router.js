import { alumniSignupController } from "../Controller/index.js";

export const alumniRouter = (router) => {
    console.log("ALUMNI")
  router.route("/alumni/signUp").post(alumniSignupController);
};
