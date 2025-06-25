import { JobModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";


export const createJobPOst = async (req, res) => {
  try {
    const { job } = req.body;
    const alumniId = req.userId;

    if (!job) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const jobData = new JobModel({ ...job, alumniId });
    jobData.save();

    return res.status(statusCode.SUCCESS).send({
      message: message.JOB_ADDITION_SUCCESSFULL,
    });
  } catch (error) {
    console.log("Error occur in CreateJobPOst controller");
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};


// admin can remove the job 
// alumni also see the job if job status false then show admin remove the job type message

export const updateJobPOst = async (req, res) => {
    
    try {
        
    } catch (error) {
        console.log("Error Occur in UpdateJobPost event")
    }
}


export const viewAlumniJob = async (req, res) => {
}


export const deletedJobPost = async (req, res) => {
} 


export const viewJobPostByAdmin = async (req, res) => {
    try {
        
        const jobsData = await JobModel.find({});

        return res.status(statusCode.SUCCESS).send({
            jobsData,
            message: message.JOB_ADMIN_VIEW_SUCCESS
        });

    } catch (error) {
        console.log("Error occur in ViewAdminJobPost : ", error);
        return res.status(statusCode.ERROR).send({
            message : message.SOMETHING_WENT_WRONG
        })
    }
}

export const removeJobPOstByAdmin = async (req, res) => {
    
}

