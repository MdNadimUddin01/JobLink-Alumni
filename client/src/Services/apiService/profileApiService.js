import { setLoading, setUser } from "../../Slices";
import { apiCall } from "../apiConnector";
import { endpoints } from "../../Utils/api.js";
import { toast } from "react-hot-toast";

export async function loginUser(data, navigate, dispatch) {
  dispatch(setLoading(true));
  const toastId = toast.loading("Login Successfull...");

  try {
    const res = await apiCall("POST", endpoints.LOGIN, data);

    console.log("LOGIN API RESPONSE............", res);

    if (res.status != 200) {
      throw new Error(res.data.message);
    }
    toast.success(res?.data?.message ?? "Login successfull", {
      id: toastId,
    });

    navigate("/");
    localStorage.setItem("user", JSON.stringify(res.data.user));
    dispatch(setUser(res.data.user));
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Login Failed";

    toast.error(errorMessage, { id: toastId });

    console.log("Login Api Error", error);
  }

  dispatch(setLoading(false));
}

export function logoutUser(dispatch, navigate) {
  toast.success("Logout Successfull...");
  localStorage.removeItem("user");
  dispatch(setUser(null));
  navigate("/");
}

export async function getAlumni(alumniId) {
  let data = {};
  const toastId = toast.loading("Fetching Alumni Data...");
  try {
    const res = await apiCall("POST", endpoints.ALUMNI_DATA, { alumniId });
    data = res.data.alumniData;
    toast.success(res?.data?.message ?? "Alumni data Fethced", {
      id: toastId,
    });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Alumni Data Fetched Failed";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
    }
  }

  return data;
}
