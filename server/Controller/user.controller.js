import { AlumniModel, UserModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email , password)

    if (!email || !password) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const userInfo = await UserModel.findOne({ email });

    //   console.log(userInfo)

    if (!userInfo) {
      return res.status(statusCode.NOT_FOUND).send({
        message: message.LOGIN_ERROR,
      });
    }

    if (!bcrypt.compareSync(password, userInfo.password)) {
      return res.status(statusCode.UNAUTHORIZED).send({
        message: message.LOGIN_ERROR,
      });
    }

    if (userInfo.role === "Alumni") {
      
      const alumniDetails = await AlumniModel.findOne({ alumniId: userInfo._id });

      if (alumniDetails.emailVerify === "Not verifeid") {
        return res.status(statusCode.REQUIRED).send({
          message : "Please verify your mail"
        })
      }

      if (alumniDetails.adminVerify == "Not verifeid") {
        return res.status(statusCode.REQUIRED).send({
          message : "Your account is not verified"
        })
      }

      if (!alumniDetails.status) {
        return res.status(statusCode.NOT_FOUND).send({
          message : message.ACCOUNT_CLOSED
        })
      }
      
    }

    console.log("userInfo : ", userInfo);

    const payload = {
      role: userInfo.role,
      id: userInfo._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res
      .cookie("token", token, { maxAge: 3 * 24 * 60 * 60*1000 , httpOnly: true })
      .send({
        message: message.ACCOUNT_LOGIN_SUCCESSFULL,
        user: userInfo,
      });
    
  } catch (error) {
    console.log(error.message);
    return res.status(statusCode.ERROR).send({
      message: message.LOGIN_ISSUE,
    });
  }
};
