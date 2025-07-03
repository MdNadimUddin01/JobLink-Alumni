import express, { Router } from "express";
import { adminSignUpController, adminVerifyAlumni, getAlumniData } from "../Controller/index.js";
import { getAuth, verifyAdmin } from "../Middleware/auth.js";

export const adminRouter = (router) => {
  // console.log("Admin Router : " , router);
  router.get("/admin", (req, res) => {
    console.log("Admin");
    res.send("Admin");
  });

  router.route("/admin/signUp").post(adminSignUpController);
  router.route("/admin/getAlumniData").get(getAlumniData)
  router.route("/admin/verifyAlumniEmail").post(getAuth , verifyAdmin , adminVerifyAlumni);

};
