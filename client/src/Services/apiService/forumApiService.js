import { apiCall } from "../apiConnector.js";
import { forumEndpoints } from "../../Utils/api.js";
import { setMyForm, setJoinedForum } from "../../Slices";
import { message } from "../../../../server/Utils/status.message.js";
import {toast} from "react-hot-toast";

export const alumniAddForum = async (forum, navigate) => {
  const toastId = toast.loading("Creating Forum...");

  try {
    const res = await apiCall("POST", forumEndpoints.ADD_FORUM, { forum });

    if (res.status !== 200) {
      throw Error("forum Creation Failed");
    }

    // console.log("RES : ", res);
    toast.success(res?.data?.message ?? "Forum add successfull", {
      id: toastId,
    });
    navigate("/alumni/viewMyForum");
  } catch (error) {
    console.log("error : ", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to add forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};

export const alumniViewForum = async (dispatch , navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching forum deails...");

  try {
    const res = await apiCall("GET", forumEndpoints.VIEW_ALUMNI_FORUM);

    if (res.status !== 200) {
      throw Error("forum data fetching Failed");
    }

    result = res.data.forumData;
    toast.success(res?.data?.message ?? "Forum Fetch successfull", {
      id: toastId,
    });

    // localStorage.setItem("viewAlumniForum", JSON.stringify(result));
    // dispatch(setMyForm(result));
  } catch (error) {
    console.log("Error : ", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  return result;
};

export const getForumData = async (forumId , navigate) => {
  const toastId = toast.loading("Fetching forum deails...");

  let result = {};
  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_GET_FORUM, {
      forumId,
    });

    if (res.status !== 200) {
      throw new Error("Alumni dat fetching Failed");
    }

    toast.success(res?.data?.message ?? "Forum Fetch successfull...", {
      id: toastId,
    });

    result = res.data.forumData;
  } catch (error) {
    console.log(error);
    
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch forum";

    toast.error(errorMessage, { id: toastId });
    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
  // console.log("RES : ", result);

  return result;
};

export const alumniUpdateForum = async (forum, forumId, navigate) => {
  const toastId = toast.loading("Updating forum deails...");

  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_UPDATE_FORUM, {
      forum,
      forumId,
    });

    if (res.status !== 200) {
      throw new Error("Alumni Updatetion Failed");
    }
    toast.success(res?.data?.message ?? "Forum Updated...", {
      id: toastId,
    });
    // await alumniViewForum(dispatch);
    navigate("/alumni/viewMyForum");
  } catch (error) {

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
    "Forum updation Failed";

    toast.error(errorMessage, { id: toastId });

    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};

export const getAllForum = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching forum deails...");

  try {
    const res = await apiCall("GET", forumEndpoints.ALUMNI_GET_ALL_FORUM);
    if (res.status !== 200) {
      throw new Error("Alumni Data fetch Failed");
    }

    toast.success(res?.data?.message ?? "Forum Fetch successfull", {
      id: toastId,
    });

    // console.log("RES : ", res);
    result = res.data.forumData;
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  // console.log('res ' , result)
  return result;
};

export const alumniJoinForum = async (forumId, navigate) => {
  const toastId = toast.loading("Joining forum...");

  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_JOIN_FORUM, {
      forumId,
    });
    if (res.status !== 200) {
      throw new Error("Alumni Updatetion Failed");
    }

    toast.success(res?.data?.message ?? "Forum Joined...", {
      id: toastId,
    });

    // localStorage.setItem("viewJoinedForum", JSON.stringify(res.data.forumData ?? []));

    navigate("/alumni/viewJoinedForum");
  } catch (error) {
    console.log(error);

     const errorMessage =
       error?.response?.data?.message ||
       error?.response?.data?.error ||
       "Forum joining failed";

    toast.error(errorMessage, { id: toastId });
    
    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};

export const getAllJoinedForum = async (dispatch, navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching Joined forum...");

  try {
    const res = await apiCall(
      "GET",
      forumEndpoints.ALUMNI_GET_ALL_JOINED_FORUM
    );

    if (res.status !== 200) {
      throw new Error("Fetching joined forum data failed");
    }
    result = res.data.forumData;

    toast.success(res?.data?.message ?? "Joined Forum Fetch successfull", {
      id: toastId,
    });
    // localStorage.setItem("viewJoinedForum", JSON.stringify(res.data.forumData));
    dispatch(setJoinedForum(result));
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch joined forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  return result;
};

export const adminGetAllForum = async (navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching forum deails...");

  try {
    const res = await apiCall("GET", forumEndpoints.ADMIN_GET_ALL_FORUM);
    console.log("RESPONSE : ", res);
    if (res.status !== 200) {
      throw new Error("Admin Data fetch Failed");
    }

    toast.success(res?.data?.message ?? "Forum Fetch successfull", {
      id: toastId,
    });

    result = res.data.forumData ?? [];
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to fetch forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  // console.log("RESULT : A ", result)

  return result;
};

export const adminRemoveForum = async (forumId, navigate) => {
  const toastId = toast.loading("Removing forum deails...");

  try {
    const res = await apiCall("POST", forumEndpoints.ADMIN_REMOVE_FORUM, {
      forumId,
    });
    if (res.status !== 200) {
      throw new Error("Admin remove forum Failed");
    }

    toast.success(res?.data?.message ?? "Forum Removed...", {
      id: toastId,
    });
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to remove forum...";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};

export const alumniDeleteForum = async (forumId, navigate) => {
  const toastId = toast.loading("Removing forum deails...");
  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_DELETE_FORUM, {
      forumId,
    });

    // console.log()
    if (res.status !== 200) {
      throw new Error("Admin remove forum Failed");
    }

    console.log("RES : ", res);

    // await alumniViewForum(dispatch);
    toast.success(res?.data?.message ?? "Forum Removed", {
      id: toastId,
    });
    // navigate("/forums");
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to remove forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};

export const getAllForumChat = async (forumId, navigate) => {
  let result = [];
  const toastId = toast.loading("Fetching forum chat...");

  try {
    const res = await apiCall("POST", forumEndpoints.GET_FORUM_CHAT, {
      forumId,
    });

    toast.success(res?.data?.message ?? "ForumChat Fetch successfull", {
      id: toastId,
    });

    result = res.data.forumChat;
  } catch (error) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to Fetch Forum";

    toast.error(errorMessage, { id: toastId });

    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }

  return result;
};

export const sendMessage = async (forumId, message, navigate) => {
  try {
    const res = await apiCall("POST", forumEndpoints.SEND_FORUM_CHAT, {
      forumId,
      message,
    });

    if (res.status !== 200) {
      throw new Error("Error occur at send message");
    }
  } catch (error) {
    console.log(error);
    if (error.status === 440) {
      localStorage.clear();
      navigate("signIn");
    }
  }
};
