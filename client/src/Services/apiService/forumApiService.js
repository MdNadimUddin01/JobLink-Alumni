import { apiCall } from "../apiConnector.js";
import { forumEndpoints } from "../../Utils/api.js";
import { setMyForm, setJoinedForum } from "../../Slices";
import { message } from "../../../../server/Utils/status.message.js";

export const alumniAddForum = async (forum, navigate) => {
  try {
    const res = await apiCall("POST", forumEndpoints.ADD_FORUM, { forum });

    if (res.status !== 200) {
      throw Error("forum Creation Failed");
    }

    // console.log("RES : ", res);
    navigate("/alumni/viewMyForum");
  } catch (error) {
    console.log("error : ", error);
  }
};

export const alumniViewForum = async (dispatch) => {
  let result = [];

  try {
    const res = await apiCall("GET", forumEndpoints.VIEW_ALUMNI_FORUM);

    if (res.status !== 200) {
      throw Error("forum data fetching Failed");
    }

    result = res.data.forumData;

    // localStorage.setItem("viewAlumniForum", JSON.stringify(result));
    // dispatch(setMyForm(result));

  } catch (error) {
    console.log("Error : ", error);
  }

  return result;
};

export const getForumData = async (forumId) => {


  let result = {};
  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_GET_FORUM, { forumId });

    if (res.status !== 200) {
      throw new Error("Alumni Updatetion Failed");
    }

    
    result = res.data.forumData
  } catch (error) {
    console.log(error)
  }
  console.log("RES : ", result);

  return result
}

export const alumniUpdateForum = async (forum, forumId, navigate) => {
  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_UPDATE_FORUM, {
      forum,
      forumId,
    });

    if (res.status !== 200) {
      throw new Error("Alumni Updatetion Failed");
    }

    // await alumniViewForum(dispatch);
    navigate("/alumni/viewMyForum");
      
  } catch (error) {
    console.log(error);
  }
};

export const getAllForum = async () => {
  let result = [];

  try {
    const res = await apiCall("GET", forumEndpoints.ALUMNI_GET_ALL_FORUM);
    if (res.status !== 200) {
      throw new Error("Alumni Data fetch Failed");
    }
    // console.log("RES : ", res);
    result = res.data.forumData;
  } catch (error) {
    console.log(error);
  }

  console.log('res ' , result)
  return result;
};

export const alumniJoinForum = async (forumId, navigate) => {
  
    try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_JOIN_FORUM, {
      forumId,
    });
    if (res.status !== 200) {
      throw new Error("Alumni Updatetion Failed");
    }
      
    // localStorage.setItem("viewJoinedForum", JSON.stringify(res.data.forumData ?? []));
      
      
    navigate("/alumni/viewJoinedForum");
      
  } catch (error) {
    console.log(error);
    }
    
};

export const getAllJoinedForum = async (dispatch) => {
    let result = []
  try {
    const res = await apiCall(
      "GET",
      forumEndpoints.ALUMNI_GET_ALL_JOINED_FORUM
    );

    if (res.status !== 200) {
      throw new Error("Fetching joined forum data failed");
    }
      result = res.data.forumData
    // localStorage.setItem("viewJoinedForum", JSON.stringify(res.data.forumData));
    dispatch(setJoinedForum(result));
  } catch (error) {
    console.log(error);
  }
    
    return result;
};

export const adminGetAllForum = async () => {
  let result = [];

  try {
    const res = await apiCall("GET", forumEndpoints.ADMIN_GET_ALL_FORUM);

    if (res.status !== 200) {
      throw new Error("Admin Data fetch Failed");
    }

    result = res.data.forumData ?? [];
    console.log("RESPONSE : " , res)
  } catch (error) {
    console.log(error);
  }

  console.log("RESULT : A ", result)

  return result;
};

export const adminRemoveForum = async (forumId) => {
  
  try {
    const res = await apiCall("POST", forumEndpoints.ADMIN_REMOVE_FORUM, {
      forumId,
    });
    if (res.status !== 200) {
      throw new Error("Admin remove forum Failed");
    }
  } catch (error) {
    console.log(error);
  }
};

export const alumniDeleteForum = async (forumId) => {
  try {
    const res = await apiCall("POST", forumEndpoints.ALUMNI_DELETE_FORUM, {
      forumId,
    });

    // console.log()
    if (res.status !== 200) {
      throw new Error("Admin remove forum Failed");
    }

    console.log("RES : " , res)

    // await alumniViewForum(dispatch);

    // navigate("/forums");
  } catch (error) {
    console.log(error);
  }
};


export const getAllForumChat = async (forumId) => {
  
  let result = [];

  try {
    
    const res = await apiCall("POST", forumEndpoints.GET_FORUM_CHAT, { forumId });

    result = res.data.forumChat;

  } catch (error) {
    console.log(error)
  }

  return result;
}

export const sendMessage = async (forumId, message) => {
  
  try {

    const res = await apiCall("POST", forumEndpoints.SEND_FORUM_CHAT, {
      forumId,message
    });

    if (res.status !== 200) {
      throw new Error("Error occur at send message")
    }

  } catch (error) {
    console.log(error);
  }

}