import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  typeOfEvent: {
    type: String,
    required: true,
  },
  criteria: {
    type: String,
    required: true,
  },
  modeOfApply: {
    type: String,
    required: true,
  },
  startDateToApply: {
    type: String,
    required: true,
  },
  lastDateToApply: {
    type: String,
    required: true,
  },
  startTimeToApply: {
    type: String,
    required: true,
  },
  endTimeToApply: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
  },
  uploadTime: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const EventModel = mongoose.model("EventSchema", eventSchema, "Event");

export { EventModel };
