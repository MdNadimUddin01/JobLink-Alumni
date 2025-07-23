import { setLoading, setUser } from "../../Slices";
import { apiCall } from "../apiConnector";
import { endpoints } from "../../Utils/api.js";

export function loginUser(data) {
  return async (dispatch, navigate) => {
    dispatch(setLoading(true));
    try {
      const res = await apiCall("POST", endpoints.LOGIN, data);

      console.log("LOGIN API RESPONSE............", res);

      if (res.statusText != "OK") {
        throw new Error(res.data.message);
      }

      navigate("/");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log("Login Api Error", error);
    }

    dispatch(setLoading(false));
  };
}

export function logoutUser(dispatch, navigate) {
  localStorage.removeItem("user");
  dispatch(setUser(null));
  navigate("/");
}

export async function getAlumni(alumniId) {
  let data = {};

  try {
    const res = await apiCall("POST", endpoints.ALUMNI_DATA, { alumniId });
    data = res.data.alumniData;
  } catch (error) {
    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
      const { redirectTo } = error.response.data;
      window.location.href = redirectTo;
    }
  }

  return data;
}
