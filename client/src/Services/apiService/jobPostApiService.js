import { jobEndPoints } from "../../Utils/api";
import { apiCall } from "../apiConnector";
import { toast } from "react-hot-toast";

export const addJobPost = async (jobData, navigate) => {
  const toastId = toast.loading("Creating job post...");

  try {
    const res = await apiCall("POST", jobEndPoints.ADD_JOB, { job: jobData });

    if (res.status !== 200) {
      throw Error("Job Posting Failed, try again");
    }
    toast.success(res?.data?.message ?? "job post creation successfull", {
      id: toastId,
    });
    navigate("/alumni/viewMyJob");
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to creating job post";

    toast.error(errorMessage, { id: toastId });
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }
};

export const viewAllJobData = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching job post...");

  try {
    const res = await apiCall("GET", jobEndPoints.VIEW_ALL_JOB);

    if (res.status !== 200) {
      return new Error("Fetching job data failed");
    }

    // console.log(res);
    console.log("RESponse : ", res);
    result = res.data.jobData;
    toast.success(res?.data?.message ?? "Job post fetch successfull", {
      id: toastId,
    });

  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch job post";

    toast.error(errorMessage, { id: toastId });
    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
     navigate("/signIn");
    }
  }

  return result;
};

export const viewJobData = async (jobId , navigate) => {
  let result = {};
  const toastId = toast.loading("Fetching job post...");

  try {
    const res = await apiCall("POST", jobEndPoints.VIEW_JOB_DATA, { jobId });

    if (res.status !== 200) {
      throw new Error("Fetching job data failed");
    }

    result = res.data.jobData;
    toast.success(res?.data?.message ?? "Job post fetch successfull", {
      id: toastId,
    });
    // console.log("res : ", res);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch job post";

    toast.error(errorMessage, { id: toastId });
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }

  return {
    jobId: result.jobId ?? "",
    post: result.post ?? "",
    companyName: result.companyName ?? "",
    noOfVacancy: result.noOfVacancy ?? "",
    salary: result.salary ?? "",
    location: result.location ?? "",
    bond: result.bond ?? "No bound",
    timings: result.timings ?? "",
    applystartDate: result.applystartDate ?? "",
    applyEndDate: result.applyEndDate ?? "",
    requirement: result.requirement ?? "",
    jobType: result.jobType ?? "Internship",
    status: result.status ?? true,
    referralAvailable: result.referralAvailable ?? "No",
  };
};

export const updateJobData = async (job, jobId, navigate) => {
  const toastId = toast.loading("updating job post...");
  try {
    const res = await apiCall("POST", jobEndPoints.UPDATE_JOB_POST, {
      job,
      jobId,
    });

    if (res.status !== 200) {
      throw new Error("Fetching job data failed");
    }

    toast.success(res?.data?.message ?? "Job post updation successfull", {
      id: toastId,
    });

    navigate("/alumni/viewMyJob");

  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to update job post";

    toast.error(errorMessage, { id: toastId });
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }

  
};

export const viewAlumniJobData = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching job post...");

  try {
    const res = await apiCall("GET", jobEndPoints.VIEW_MY_JOBS);

    if (res.status !== 200) {
      throw new Error("Fetching job data failed");
    }

    toast.success(res?.data?.message ?? "Job post fetch successfull", {
      id: toastId,
    });
    //   console.log(res);
    console.log("RESULT : ", res);
    result = res.data.jobData;
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch job post";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }

  

  return result;
};

export const deleteJobPost = async (jobId , navigate) => {
  const toastId = toast.loading("Removing job post...");
  try {
    const res = await apiCall("POST", jobEndPoints.DELETE_JOB, { jobId });

    if (res.status !== 200) {
      throw Error("JOb deletion failed");
    }

    toast.success(res?.data?.message ?? "Job post removed successfull", {
      id: toastId,
    });
    // console.log("res : " , res)
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to remove job post";

    toast.error(errorMessage, { id: toastId });
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }
};

export const removeJobPost = async (jobId , navigate) => {
  const toastId = toast.loading("Removing job post...");

  try {
    const res = await apiCall("POST", jobEndPoints.REMOVE_JOB_POST, { jobId });

    toast.success(res?.data?.message ?? "Job post removed successfull", {
      id: toastId,
    });

  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to remove job post";

    toast.error(errorMessage, { id: toastId });
    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }
};

export const adminViewJobs = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching job post...");

  try {
    const res = await apiCall("GET", jobEndPoints.ADMIN_VIEW_JOBS);

    if (res.status !== 200) {
      return new Error("Fetching job data failed");
    }

    result = res.data.jobData;
    toast.success(res?.data?.message ?? "Job post fetch successfull", {
      id: toastId,
    });

  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch job post";

    toast.error(errorMessage, { id: toastId });
    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
      navigate("/signIn");
    }
  }

  return result;
};
