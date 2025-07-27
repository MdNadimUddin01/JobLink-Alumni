import path from "path";
import { AlumniModel, UserModel } from "../Model/index.js";
import { mailer } from "../Utils/mailer.js";
import { message, statusCode } from "../Utils/status.message.js";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { getHtml, subjectVerify } from "../Html/mailHtml.js";

export const alumniSignupController = async (req, res) => {
  try {
    // console.log("req : ", req.body);
    // console.log("File : ", req.files);

    const { email, password, alumni } = req.body;
    const _alumni = JSON.parse(alumni);

    console.log(_alumni);
    // const  = JSON.parse(req.body.alumni);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filename = req.files.profile;
    const fileName = new Date().getTime() + filename.name;

    const pathName = path.join(
      __dirname.replace("Controller", "") + "Public/Document/" + fileName
    );

    console.log(__dirname);
    console.log("PATHNAME : ", pathName);

    const alreadyExist = await UserModel.findOne({ email });

    if (alreadyExist) {
      return res.status(statusCode.ALREADY_EXIST).send({
        message: message.ALREADY_ACCOUNT_EXIST,
      });
    }

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
            ..._alumni,
            alumniId: userData._id,
            profile: fileName,
          });

          const verificationLink =
            process.env.FRONT_END_URL +
            "alumni/verifyEmail?id=" +
            encodeURIComponent(userData._id) +
            "&email=" +
            encodeURIComponent(email);

          // console.log("alumniData : ", alumniData);

          alumniData.save();
          console.log(alumniData);

          mailer(
            email,
            subjectVerify,
            getHtml(email, verificationLink),
            async (value) => {
              if (value) {
                console.log(
                  "Mail sending successfully | Inside Alumni controller"
                );

                return res.status(statusCode.SUCCESS).send({
                  message: message.WAIT_FOR_ADMIN_APPROVAL,
                });
                
              } else {
                console.log("Error while sending mail from mailer");
                return res.status(statusCode.ERROR).send({
                  message: message.MAIL_SENDING_ERROR,
                });
              }
            }
          );
        }
      } catch (error) {
        return res.status(statusCode.ERROR).send({
          message: message.SERVER_ERROR,
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

    console.log(req.body)
    const { email , id } = req.body;

    const status = {
      $set: {
        emailVerify: "Verified",
      },
    };

    const existingData = await UserModel.findOne({ email, _id: id });
    
    console.log(existingData)

    if (!existingData) {
      return res.status(statusCode.NOT_FOUND).send({
        message : message.USER_NOT_FOUND
      })
    }

    const updatedData = await AlumniModel.updateOne({ alumniId : id }, status);
    console.log("Email Veirify Result : ", updatedData);

    return res.status(statusCode.SUCCESS).send({
      message: message.MAIL_VERIFICATION_SUCCESSFULL,
    });

  } catch (error) {
    console.log("ERROR WHILE VERIFYING MAIL : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.MAIL_VERIFYING_ERROR,
    });
  }
};


export const getAlumniInfo = async (req, res) => {
  
  const {alumniId} = req.body;
  

  try {

    const alumniData = await AlumniModel.findOne({ alumniId });
    console.log("ALUMNIDATA : " , alumniData)

    if (!alumniData) {
      return res.status(statusCode.NOT_FOUND).send({
        message : message.ALUMNI_NOT_FOUND,
      })
    }



    const userData = await UserModel.findOne({ _id: alumniId });
    console.log("USERID " , userData)

    if (!userData) {
      return res.status(statusCode.NOT_FOUND).send({
        message : message.ALUMNI_NOT_FOUND
      })
    }
  

    const alumni = { ...alumniData._doc, email: userData.email };

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_DATA_FETCHED,
      alumniData : alumni
    })
    
  } catch (error) {
    console.log("Error at get alumni Info : ", error)
    return res.status(statusCode.ERROR).send({
      message:message.SOMETHING_WENT_WRONG
    })
  }

}