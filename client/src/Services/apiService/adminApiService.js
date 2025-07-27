import { apiCall } from "../apiConnector";
import { admin } from "../../Utils/api.js";
import { toast } from "react-hot-toast";

export const getAlumniData = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching alumni data...");

  try {
    const res = await apiCall("GET", admin.ALUMNI_DATA);

    if (res.status !== 200) {
      throw Error("Alumni data not fethced");
    }

    result = res.data.alumniData;
    toast.success(res?.data?.message ?? "Data fetched successfull", {
      id: toastId,
    });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to create alumni account";
    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  return result;
};

export const verifyAlumniEmail = async (alumniId , navigate) => {
  const toastId = toast.loading("Verifying alumni data...");

  try {
    const res = await apiCall("POST", admin.VERIFY_ALUMNI_EMAIL, { alumniId });
    console.log(res);

    if (res.status !== 200) {
      throw Error("Alumni email verify failed");
    }

    toast.success(res?.data?.message ?? "Alumni successfull", {
      id: toastId,
    });
      
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to verfify alumni account";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};
