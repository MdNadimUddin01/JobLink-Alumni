import { EventModel } from "../Model/index.js";
import { message, statusCode } from "../Utils/index.js";

export const adminAddEventConroller = async (req, res) => {
  try {
    const { event } = req.body;

    console.log(event)

    if (!event) {
      return res.status(statusCode.REQUIRED).send({
        message: message.ALL_FIELD_REQUIRED,
      });
    }

    const date = new Date();
    event.uploadDate = date.toDateString();
    event.uploadTime = date.toLocaleTimeString();

    console.log("event : ", event);

    const addEventData = new EventModel(event);
    await addEventData.save();

    console.log("addEventData : " , addEventData);

    return res.status(statusCode.SUCCESS).send({
      message: `Event is ${message.SUCCESSFULLY_ADDED}`,
    });
  } catch (error) {
    console.log("Error occur in add event controller : " , error)
    return res.status(statusCode.ERROR).send({
      message: message.EVENT_NOT_ADDED,
    });
  }
};


export const adminDeleteEventcontroller = async (req, res) => {
  try {
    const { eventId } = req.body;
    // console.log(req);
    console.log(eventId);
    const updateStaus = {
      $set: {
        status: false,
      },
    };

    const updateData = await EventModel.updateOne(
      { _id: eventId },
      updateStaus
    );

    const updatedVenet = await EventModel.findOne({_id : eventId})

    console.log(updatedVenet);

    return res.status(statusCode.SUCCESS).send({
      message: message.EVENT_DELETED,
    });
    
  } catch (error) {
    console.log("EROR WHILE DLETING EVENT BY ADMIN : ", error);
    return res.status(statusCode.ERROR).send({
      message: message.EVENT_DELETE_ERROR,
    });
  }
};

export const adminUpdateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventData = await EventModel.findOne({ _id: eventId });
    // console.log("eventData : " , eventData)

    // console.log("REQ : ", req);
    const { event } = req.body;

    // console.log(eventId);

    if (!eventData) {
      return res.status(statusCode.NOT_FOUND).send({
        message: `Event ${message.NOT_FOUND}`,
      });
    }

    const updateEvent = {
      $set: event,
    };

    // console.log("updateEvent : " , updateEvent)

    const updatedData = await EventModel.updateOne(
      { _id: eventId },
      updateEvent
    );

    const data = await EventModel.findOne({ eventId });

    // console.log(data);

    return res.status(statusCode.SUCCESS).send({
      message: message.EVENT_UPDATED,
    });
  } catch (error) {
    console.log("Error Occur while update Event Controller : ", error);
    return res.status(statusCode.ERROR).send({
      message: `message.${SOMETHING_WENT_WRONG} While Updating the Event`,
    });
  }
};
