import {
  AlumniModel,
  ForumChatModel,
  ForumMemberModel,
  ForumModel,
} from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";

export const alumniAddForum = async (req, res) => {
  try {
    const { forum } = req.body;

    const alumniId = req.userId;
    // console.log({ ...forum, alumniId });

    const forumData = new ForumModel({ ...forum, alumniId });
    forumData.save();

    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_ADDED,
    });
  } catch (error) {
    console.log("Erro occur in aluminAddForum : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const alumniUpdateForum = async (req, res) => {
  try {
    const { forum, forumId } = req.body;
    const alumniId = req.userId;

    let forumData = await ForumModel.findOne({ _id: forumId });

    if (!forumData) {
      return res.status(statusCode.NOT_FOUND).send({
        message: message.FORUM_NOT_FOUND,
      });
    }

    // console.log("forumData : ", forumData);
    // console.log("AlumniId : ", alumniId);

    if (forumData.alumniId != alumniId) {
      return res.status(statusCode.UNAUTHORIZED).send({
        message: message.UNAUTHORIZED,
      });
    }

    forumData = await ForumModel.updateOne({ _id: forumId }, forum);

    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_UPDATE_SUCCESSFULL,
    });
  } catch (error) {
    console.log("Error at alumni update forum : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const getForum = async (req, res) => {
  try {
    const { forumId } = req.body;

    const forumData = await ForumModel.findOne({ _id: forumId });

    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_DATA_FETCHED,
      forumData,
    });
  } catch (error) {
    console.log("Error in get forum  controller : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const alumniForumList = async (req, res) => {
  try {
    const alumniId = req.userId;

    const forumData = await ForumModel.find({ alumniId, status: true });

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_GET_MY_FORUM_SUCCESS,
      forumData,
    });
  } catch (error) {
    console.log("Error in alumni forum list controller : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const getAllForumList = async (req, res) => {
  try {
    const forumData = await ForumModel.find({ status: true });

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_GET_MY_FORUM_SUCCESS,
      forumData,
    });
  } catch (error) {
    console.log("Error at get all forum list : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const getAdminForumList = async (req, res) => {
  try {
    const forumData = await ForumModel.find({});
    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_GET_MY_FORUM_SUCCESS,
      forumData,
    });
  } catch (error) {
    console.log("Error at get all forum list : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
};

export const adminRemoveForum = async (req, res) => {
  try {
    const { forumId } = req.body;

    const status = {
      $set: {
        status: false,
      },
    };

    if (!forumId) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const form = await ForumModel.updateOne({ _id: forumId }, status);

    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_REMOVE_SUCCESSFULL,
    });
  } catch (error) {
    console.log("Error at Admin Remove forum : ", error);

    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const joinForum = async (req, res) => {
  try {
    const { forumId } = req.body;
    const alumniId = req.userId;

    const existingJoin = await ForumMemberModel.findOne({ forumId, alumniId });

    if (existingJoin) {
      return res.status(statusCode.SUCCESS).send({
        message: message.FORUM_ALREADY_JOINED,
      });
    }

    const joinData = new ForumMemberModel({ forumId, alumniId });
    joinData.save();

    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_JOINED,
    });
  } catch (error) {
    console.log("Error in alumniJoinForum : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const deleteForum = async (req, res) => {
  try {
    const { forumId } = req.body;
    const alumniId = req.userId;

    const updateStatus = {
      $set: {
        status: false,
      },
    };

    const deleteForum = await ForumModel.updateOne(
      { _id: forumId, alumniId },
      updateStatus
    );

    return res.status(statusCode.SUCCESS).send({
      message: message,
    });
  } catch (error) {
    console.log("Error occur at delete forum : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const getJoinedForum = async (req, res) => {
  try {
    const alumniId = req.userId;

    const status = true;
    let forumData = await ForumMemberModel.find({
      alumniId,
    }).populate("forumId");

    forumData = forumData.filter((data) => data.forumId.status == true);
    forumData = forumData.map((data) => data.forumId);

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_GET_MY_FORUM_SUCCESS,
      forumData,
    });
    
  } catch (error) {
    console.log("Error at getJoinedForum :  ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};

export const forumChat = async (req, res) => {
  try {
    const { forumId, message } = req.body;
    const alumniId = req.userId;

    const alumniDetails = await AlumniModel.findOne({ alumniId });

    console.log(alumniDetails);

    const forumChatData = new ForumChatModel({
      forumId,
      message,
      alumniId,
      alumniName: alumniDetails.userName,
    });

    forumChatData.save();

    return res.status(statusCode.SUCCESS).send({
      message : "Message Sent"
    })
    //needs to manage forum member table also
    // needs to manage forum chat table
  } catch (error) {
    console.log("Error at forumChat : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG,
    });
  }
};


export const getAllForumChat = async (req, res) => {
  
  try {
    
    const { forumId } = req.body;
    const alumniId = req.userId;
  
    const forumChat = await ForumChatModel.find({ forumId });
  
    return res.status(statusCode.SUCCESS).send({
      message: message.FORUM_CHAT_FETHCED,
      forumChat,
    });
    
  } catch (error) {
    console.log("ERROR AT getAllForumChat : ", error);
    return res.status(statusCode.ERROR).send({
      message:message.SOMETHING_WENT_WRONG
    })
  }
}

