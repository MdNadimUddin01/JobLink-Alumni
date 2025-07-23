import { apiCall } from "../apiConnector"
import {admin} from "../../Utils/api.js"

export const getAlumniData = async () => {
    
    let result = [];

    try {

        const res = await apiCall("GET", admin.ALUMNI_DATA);

        if (res.status !== 200) {
            throw Error("Alumni data not fethced")
        }

        result = res.data.alumniData;

    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

    return result
    
}

export const verifyAlumniEmail = async (alumniId) => {
    
    try {

        const res = await apiCall("POST", admin.VERIFY_ALUMNI_EMAIL, { alumniId });
        console.log(res)

        if (res.status !== 200) {
            throw Error("Alumni email verify failed");
        }


    } catch (error) {
        console.log(error);
        if (error.status === 440) {
          localStorage.clear();
          const { redirectTo } = error.response.data;
          window.location.href = redirectTo;
        }
    }

}

