import express, { Router } from "express";
import { adminSignUpController } from "../Controller/index.js";

export const adminRouter = (router) => {
  // console.log("Admin Router : " , router);
  router.get("/admin", (req, res) => {
    console.log("Admin");
    res.send("Admin");
  });

  router.post("/admin/signUp", adminSignUpController);
};
