import mongoose from "mongoose";

const forumSchema = mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  forumTopic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    default: new Date().toDateString(),
  },
  startTime: {
    type: String,
    default: new Date().toLocaleTimeString,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const ForumModel = mongoose.model("ForumSchema", forumSchema, "Forum");

export { ForumModel };
