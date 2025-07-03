import { EventModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";

export const getAllEvent = async (req, res) => {
  try {
    const eventData = await EventModel.find({ status: true });

    return res.status(statusCode.SUCCESS).send({
      events: eventData,
      message: `Events ${message.LIST_FETCHED_SUCCESSFULLY}`,
    });
  } catch (error) {
    console.log("ERROR WHILE FETCHING EVENT : ", error.message);
    return res.status(statusCode.ERROR).send({
      message: message.EVENT_LIST_ERROR,
    });
  }
};
