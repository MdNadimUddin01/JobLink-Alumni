import toast from "react-hot-toast";
import { eventEndpoints } from "../../Utils/api";
import { apiCall } from "../apiConnector";

export const addEvent = async (eventData, navigate) => {
  const toastId = toast.loading("Adding Event data...");
  try {
    const res = await apiCall("POST", eventEndpoints.ADD_EVENT, {
      event: eventData,
    });

    console.log(res);

    if (res.status !== 200) {
      throw Error("Event Addition failed");
    }

    toast.success(res?.data?.message ?? "Event add successfull", {
      id: toastId,
    });

    navigate("/admin/events");
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to add event";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      const { redirectTo } = error.response.data;
      window.location.href = redirectTo;
    }
  }
};

export const getAllEventData = async () => {
  let result = [];
  const toastId = toast.loading("Fetching event data...");
  try {
    const res = await apiCall("GET", eventEndpoints.GET_ALL_EVENT_DATA);
    if (res.status !== 200) {
      throw Error("Events Fethcing Failed");
    }

    result = res.data.events;
    toast.success(res?.data?.message ?? "Event fetch successfully", {
      id: toastId,
    });
    // console.log(res);
  } catch (error) {
    //   console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch event";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      const { redirectTo } = error.response.data;
      window.location.href = redirectTo;
    }
  }

  return result;
};

export const deleteEventData = async (eventId) => {
  const toastId = toast.loading("Removing event data...");
  try {

      const res = await apiCall("POST", eventEndpoints.DELETE_EVENT, { eventId });

    if (res.status !== 200) {
      throw Error("Event deletion failed");
    }

    toast.success(res?.data?.message ?? "Event Remove successfull", {
      id: toastId,
    });

  } catch (error) {
    // console.log(error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to remove event";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      const { redirectTo } = error.response.data;
      window.location.href = redirectTo;
    }
  }
};
