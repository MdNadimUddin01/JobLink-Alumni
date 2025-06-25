import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  alumniId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  post: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  noOfVacancy: {
    type: Number,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bond: {
    type: String,
    default: "No bound",
  },
  timings: {
    type: String,
    required: true,
  },
  applystartDate: {
    type: String,
    required: true,
  },
  applyEndDate: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum:["Internship" , "Full Time" , "Part Time"],
    default : "Internship",
  },
  postDate: {
    type: String,
    default: (new Date()).toDateString(),
  },
  postTime: {
    type: String,
    default: (new Date()).toLocaleTimeString(),
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const JobModel = mongoose.model("JobModel", jobSchema, "Job");

export {JobModel}