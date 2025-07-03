import { AlumniModel, JobModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";

export const createJobPost = async (req, res) => {
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

export const viewAllJobData = async (req, res) => {
  try {
    const jobData = await JobModel.find({ status: true });

    return res.status(statusCode.SUCCESS).send({
      message: message.ALL_JOB_DATA_FETCHED,
      jobData,
    });
  } catch (error) {
    console.log("Error occur at view All Job Data:", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const viewJobData = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const jobData = await JobModel.findOne({ _id: jobId });

    return res.status(statusCode.SUCCESS).send({
      message: message.JOB_DATA_FETCHED,
      jobData,
    });
  } catch (error) {
    console.log("Error occur at view job data : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const viewAlumniJob = async (req, res) => {
  try {
    const alumniId = req.userId;

    // if (!alumniId) {
    //   return res.status(statusCode.REQUIRED).send({
    //     message: message.ALL_FIELD_REQUIRED,
    //   });
    // }

    // if (alumniId !== req.userId) {
    //   return res.status(statusCode.UNAUTHORIZED).send({
    //     message : message.UNAUTHORIZED
    //   })
    // }

    const jobData = await JobModel.find({ alumniId });

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_JOB_DATA_FETCHED,
      jobData,
    });
  } catch (error) {
    console.log("Error occur at view Alumni Job :", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const alumniDeleteJobPost = async (req, res) => {
  try {
    const alumniId = req.userId;
    const { jobId } = req.body;

    console.log(jobId);

    if (!jobId) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const deletedData = await JobModel.deleteOne({ _id: jobId, alumniId });
    console.log(deletedData);

    return res.status(statusCode.SUCCESS).send({
      message: message.JOB_DELETION_SUCCESSFULL,
    });
  } catch (error) {
    console.log("Error occur at aluminDelete job post : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const updateJobPost = async (req, res) => {
  try {
    const { job, jobId } = req.body;
    const alumniId = req.userId;
    
    const existingJob = await JobModel.findOne({ _id: jobId });


    if (!existingJob) {
      return res.status(statusCode.NOT_FOUND).send({
        message: message.JOB_NOT_FOUND
      });
    }


    if (existingJob.alumniId != alumniId) {
      return res.status(statusCode.UNAUTHORIZED).send({
        message: message.UNAUTHORIZED,
      });
    }

    const updateJob = await JobModel.updateOne({ _id: jobId }, job);

    console.log(updateJob);
    return res.status(statusCode.SUCCESS).send({
      message: message,
    });
  } catch (error) {
    console.log("Error Occur in UpdateJobPost event");

    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const AdminViewJobPost = async (req, res) => {
  try {
    const jobData = await JobModel.find({});

    return res.status(statusCode.SUCCESS).send({
      jobData,
      message: message.JOB_ADMIN_VIEW_SUCCESS,
    });
  } catch (error) {
    console.log("Error occur in ViewAdminJobPost : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const AdminRemoveJobPost = async (req, res) => {
  try {
    const { jobId } = req.body;
    const status = {
      $set: {
        status: false,
      },
    };

    if (!jobId) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const updatedJob = await JobModel.updateOne({ _id: jobId }, status);

    return res.status(statusCode.SUCCESS).send({
      message: message.JOB_REMOVED_SUCCESSFULLY,
    });
  } catch (error) {
    console.log("Error occur at Admin Remove Job POst : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};
