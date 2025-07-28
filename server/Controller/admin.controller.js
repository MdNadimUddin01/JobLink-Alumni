import { AlumniModel, UserModel } from "../Model/index.js";
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

export const adminVerifyAlumni = async (req, res) => {
  
  try {
    
    const { alumniId } = req.body;

    const status = {
      $set: {
        adminVerify : "Verified"
      }
    }

    const result = await AlumniModel.updateOne({ alumniId }, status);

    console.log(result);

    //send mail for verification
    return res.status(statusCode.SUCCESS).send({
      message : message.ADMIN_VERIFICATION_SUCCESSFULL
    })
  } catch (error) {
    console.log("Error Occur While Verifying Alumni");
    return res.status(statusCode.ERROR).send({
      message :message.SOMETHING_WENT_WRONG
    })
  }
}


export const getAlumniData = async (req, res) => {
  try {
    const alumniData = await AlumniModel.find({}).populate("alumniId");
    console.log("alumniData : " ,alumniData);

    const data = alumniData.map((data) => {

      const alumniId = data.alumniId
      data.alumniId = alumniId._id
      
      return { ...data._doc, email: alumniId.email };
    });

    // console.log(data)


    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_DATA_FETCHED,
      alumniData : data
    });
    // return re;
  } catch (error) {
    console.log("Error occur While fetching alumni data list" , error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};