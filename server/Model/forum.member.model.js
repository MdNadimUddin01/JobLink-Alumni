import mongoose from "mongoose";

const forumMemberSchema = mongoose.Schema({
  forumId: {
    type: mongoose.Schema.ObjectId,
    ref: "ForumSchema",
  },
  alumniId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserSchema",
  },
  joinDate: {
    type: String,
    default: new Date().toDateString(),
  },
  joinTime: {
    type: String,
    default: new Date().toLocaleTimeString(),
  },
  status: {
    type: Boolean,
    default: true,
  },
});


const ForumMemberModel = mongoose.model("ForumMemberSchema", forumMemberSchema, "ForumMember");

export { ForumMemberModel };