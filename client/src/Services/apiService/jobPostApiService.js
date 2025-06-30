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
        console.log(error)
    }
}