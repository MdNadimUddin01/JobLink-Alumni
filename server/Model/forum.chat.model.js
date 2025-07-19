import mongoose from "mongoose";

const forumChatSchema = mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserSchema",
  },
  alumniName: {
    type: String,
    required:true
  },
  forumId: {
    type: mongoose.Schema.ObjectId,
    ref: "ForumSchema"
  },
  message: {
    type: String,
    required: true,
  },
  sendDate: {
    type: String,
    default: new Date().toDateString(),
  },
  sendTime: {
    type: String,
    default: new Date().toLocaleTimeString(),
  },
  report: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const ForumChatModel = mongoose.model(
  "ForumChatSchema",
  forumChatSchema,
  "ForumChat"
);

export { ForumChatModel };
