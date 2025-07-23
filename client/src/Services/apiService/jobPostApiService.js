import { jobEndPoints } from "../../Utils/api"
import {apiCall} from "../apiConnector"

export const addJobPost = async (jobData, navigate) => {
    
    try {
        const res = await apiCall("POST", jobEndPoints.ADD_JOB,{job:jobData});

        if (res.status !== 200) {
            throw Error("Job Posting Failed, try again");
        }

        navigate("/alumni/viewMyJob");

    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }
}

export const viewAllJobData = async () => {
    
    let result = [];

    try {
        
        const res = await apiCall("GET", jobEndPoints.VIEW_ALL_JOB);

        if (res.status !== 200) {
            return new Error("Fetching job data failed");
        }

        // console.log(res);
        result = res.data.jobData;


    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    return result;
}

export const viewJobData = async (jobId) => {

    let result = {}
    
    try {
        const res = await apiCall("POST", jobEndPoints.VIEW_JOB_DATA, { jobId });

        if (res.status !== 200) {
          throw new Error("Fetching job data failed");
        }

        result = res.data.jobData

        console.log("res : " , res)
    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    return {
      jobId: result.jobId ?? "",
      post:  result.post ?? "",
      companyName: result.companyName ?? "",
      noOfVacancy: result.noOfVacancy ?? "",
      salary: result.salary ?? "",
      location: result.location ??  "",
      bond: result.bond ?? "No bound",
      timings: result.timings ?? "",
      applystartDate: result.applystartDate ?? "",
      applyEndDate: result.applyEndDate ?? "",
      requirement: result.requirement ?? "",
      jobType: result.jobType ?? "Internship",
      status: result.status ?? true,
      referralAvailable: result.referralAvailable ?? "No",
    };
}

export const updateJobData = async (job, jobId , navigate) => {
    
    try {
        
        const res = await apiCall("POST", jobEndPoints.UPDATE_JOB_POST , {job , jobId});

        if (res.status !== 200) {
          throw new Error("Fetching job data failed");
        }
    
    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    navigate("/alumni/viewMyJob");
}

export const viewAlumniJobData = async () => {
    
    let result = [];

    try {
      const res = await apiCall("GET", jobEndPoints.VIEW_MY_JOBS);

      if (res.status !== 200) {
        throw new Error("Fetching job data failed");
      }

    //   console.log(res);
      result = res.data.jobData;
    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    return result;
}

export const deleteJobPost = async (jobId) => {

    
    try {
        const res = await apiCall("POST", jobEndPoints.DELETE_JOB, { jobId });

        if (res.status !== 200) {
            throw Error("JOb deletion failed");
        }
        
        // console.log("res : " , res)

    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    
}

export const removeJobPost = async (jobId) => {
    
    try {
        const res = await apiCall("POST", jobEndPoints.REMOVE_JOB_POST, { jobId });
    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }
}

export const adminViewJobs = async () => {
    
    let result = [];

    try {
      const res = await apiCall("GET", jobEndPoints.ADMIN_VIEW_JOBS);

      if (res.status !== 200) {
        return new Error("Fetching job data failed");
      }

      result = res.data.jobData;
    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    return result;

}