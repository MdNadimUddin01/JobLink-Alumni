import mongoose from "mongoose";

const alumniSchema = mongoose.Schema({
  useName: {
    type: String,
    required: true,
  },
  alumniId: {
    type: mongoose.Schema.ObjectId,
    // refrence :[{type:m}]ref
    ref: "User",
  },
  contact: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  passoutYear: {
    type: Number,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  currentCompany: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  linkedInProfileLink: {
    type: String,
    required: true,
  },
  emailVerify: {
    type: String,
    required: true,
    default: "Not verifeid",
  },
  adminVerify: {
    type: String,
    required: true,
    default: "Not verifeid",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const AlumniModel = mongoose.model("AlumniModel", alumniSchema, "Alumni");

export { AlumniModel };
