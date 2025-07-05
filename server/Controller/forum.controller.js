import { ForumModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";

export const alumniAddForum = async (req, res) => {
  try {
    const { forum } = req.body;

    const aluminId = req.userId;

    const forumData = new ForumModel({ ...forum, aluminId });
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
  
    const forumData = await ForumModel.find({ _id: forumId });
    
    if (!forumData) {
      return res.status(statusCode.NOT_FOUND).send({
        message : message.FORUM_NOT_FOUND
      })
    }

    if (forumData._id != alumniId) {
      return res.status(statusCode.UNAUTHORIZED).send({
        message:message.UNAUTHORIZED
      })
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


}

export const alumniForumList = async (req, res) => {
  
  try {

    const alumniId = req.userId;

    const forumData = await ForumModel.find({alumniId});

    return res.status(statusCode.SUCCESS).send({
      message: message.ALUMNI_GET_MY_FORUM_SUCCESS,
      forumData
    });
    
  } catch (error) {
    console.log("Error in alumni forum list controller : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.SERVER_ERROR,
    });
  }
}

export const getAllForumList = async (req, res) => {
  
  try {
    const forumData = await ForumModel.find({status:true});
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
}


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

}

export const adminRemoveForum = async (req, res) => {
  
  try {
    const { forumId } = req.body;
  
    const status = {
      $set: {
        status: false
      }
    }

    if (!forumId) {
      return res.status(statusCode.REQUIRED).send({
        message : message.ALL_FIELD_REQUIRED
      })
    }
  
    const form = await ForumModel.updateOne({ _id: forumId }, status);

    return res.status(status.SUCCESS).send({
      message : message.FORUM_REMOVE_SUCCESSFULL
    })


  } catch (error) {
    console.log("Error at Admin Remove forum");

    return res.status(statusCode.ERROR).send({
      message: message.SOMETHING_WENT_WRONG
    });

  }

} 


// export const joinForum = async (req, res) => {
  
//   try {
    
//     const { formId } = req.body;
//     const userId = req.userId;


//   } catch (error) {
//     console.log("Error in alumniJoinForum : ", error);
//     return res.status(statusCode.ERROR).send({

//     })
//   }
// }

export const forumChat = async (req, res) => {
  
  try {
    const { forum, message } = req.body;

    //needs to manage forum member table also
    // needs to manage forum chat table
    
  } catch (error) {
    console.log("Error at forumChat : ", error);
    return res.status(statusCode.ERROR).send({
      message : message.SOMETHING_WENT_WRONG
    })
  }

}