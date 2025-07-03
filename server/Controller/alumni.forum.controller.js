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
