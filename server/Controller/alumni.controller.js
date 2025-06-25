import path from "path";
import { AlumniModel, UserModel } from "../Model/index.js";
import { mailer } from "../Utils/mailer.js";
import { message, statusCode } from "../Utils/status.message.js";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

export const alumniSignupController = async (req, res) => {
  try {
    const { alumni, email, password } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.__dirname(__filename);

    const filename = req.files.profile;
    const fileName = new Date().getTime() + filename.name;
    const pathName = path.join(
      __dirname.replace("\\controller", "") + "/Public/Document/" + fileName
    );

    const alreadyExist = await AlumniModel.findOne({ email });

    if (alreadyExist) {
      return res.status(statusCode.ALREADY_EXIST).send({
        message: message.ALREADY_ACCOUNT_EXIST,
      });
    }

    //   const profile =

    mailer(email, async (value) => {
      if (value) {
        console.log("Mail sending successfully | Inside Alumni controller");

        filename.mv(pathName, async (error) => {
          try {
            if (error) {
              console.log("Error While Uploading Image : ", error);

              return res.status(statusCode.ERROR).send({
                message: message.PROFILE_UPLOAD_ERROR,
              });
            } else {
              const hashedPassword = bcrypt.hashSync(password, 10);

              const userData = new UserModel({
                email,
                password: hashedPassword,
              });
              userData.save();

              const alumniData = new AlumniModel({
                ...alumni,
                alumniId: userData._id,
                profile: fileName,
              });
              alumniData.save();
              console.log(alumniData);

              return res.status(statusCode.SUCCESS).send({
                message: message.WAIT_FOR_ADMIN_APPROVAL,
              });
            }
          } catch (error) {
            return res.status(statusCode.ERROR).send({
              message: message.SERVER_ERROR,
            });
          }
        });
      } else {
        console.log("Error while sending mail from mailer");
        return res.status(statusCode.ERROR).send({
          message: message.MAIL_SENDING_ERROR,
        });
      }
    });

    // const userData = new AlumniModel.cre
  } catch (error) {
    console.log("Error occur in alumniSignUpController : ", error.message);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const alumniEmailVerify = async (req, res) => {
    

    try {
        const { email } = req.body;

        const status = {
            $set: {
                emailVerify:"Verified"
            }
        }

        const updatedData = await AlumniModel.updateOne({ email }, status);
        console.log("Email Veirify Result : ", updatedData);

        return res.status(statusCode.SUCCESS).send({
            message:message.MAIL_VERIFICATION_SUCCESSFULL
        })
    } catch (error) {
        console.log("ERROR WHILE VERIFYING MAIL : ", error);
        return res.status(statusCode.ERROR).send({
            message : message.MAIL_VERIFYING_ERROR
        })
    }
}

export const getAlumniData = async (req, res) => {
  
  try {

    const alumniData = await AlumniModel.find({}).populate("alumniId");

    return re
  } catch (error) {
    console.log("Error occur While fetching alumni data list");
  }
}