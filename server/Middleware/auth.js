import jwt from "jsonwebtoken";
import { message, statusCode } from "../Utils/index.js";

export const getAuth = async (req, res, next) => {
  try {

    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
    console.log("token : " , token)
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;
    req.role = payload.role;
    
    next();
  } catch (error) {
    console.log(error.message , " : " , error);
    res.send("Error");
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.role === "Admin") {
      return res.status(statusCode.UNAUTHORIZED).send({
        message: message.ADMIN_PROTECTED_ROUTE,
      });
    }

    next();
  } catch (error) {
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const verifyAlumni = async (req, res, next) => {
  try {
    if (!req.role === "Alumni") {
      return res.status(statusCode.UNAUTHORIZED).send({
        message: message.ALUMNI_PROTECTED_ROUTE,
      });
    }

    next();
  } catch (error) {
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};
