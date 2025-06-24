import { UserModel } from "../Model/index.js";
import { statusCode, message } from "../Utils/index.js";
import bcrypt from "bcrypt";

export const adminSignUpController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await UserModel.findOne({ email });

    // console.log(existingAdmin);

    if (existingAdmin) {
      return res.status(statusCode.ALREADY_EXIST).send({
        message: message.ALREADY_ACCOUNT_EXIST,
      });
    }

    // console.log("HERE : ");

    const hashedPassword = bcrypt.hashSync(password, 10);

    const adminInfo = new UserModel({
      email,
      password: hashedPassword,
      role: "Admin",
    });

    // console.log("adminInfo : ", adminInfo);

    await adminInfo.save();

    return res.status(statusCode.SUCCESS).send({
      message: message.ACCOUNT_CREATION_SUCCESSFULL,
    });
      
  } catch (error) {
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};
