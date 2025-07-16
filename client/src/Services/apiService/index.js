export { loginUser , logoutUser ,getAlumni} from "./profileApiService"
export { getAlumniData, verifyAlumniEmail } from "./adminApiService"
export { addEvent, getAllEventData, deleteEventData } from "./eventApiService"

export { addJobPost, viewAllJobData, viewAlumniJobData, deleteJobPost, removeJobPost, adminViewJobs, viewJobData, updateJobData } from "./jobPostApiService"

export {
  adminGetAllForum,
  adminRemoveForum,
  alumniAddForum,
  alumniJoinForum,
  alumniUpdateForum,
  alumniViewForum,
  getAllForum,
  getAllJoinedForum,
  alumniDeleteForum,
  getForumData,
  getAllForumChat,
  sendMessage
} from "./forumApiService";