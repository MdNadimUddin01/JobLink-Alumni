export {
  adminSignUpController,
  adminVerifyAlumni,
  getAlumniData,
} from "./admin.controller.js";

export { logincontroller } from "./user.controller.js";

export {
  alumniSignupController,
  alumniEmailVerify,
  getAlumniInfo,
} from "./alumni.controller.js";

export {
  adminAddEventConroller,
  adminDeleteEventcontroller,
  adminUpdateEventController,
} from "./admin.event.controller.js";

export { getAllEvent } from "./user.event.controller.js";


export {
  createJobPost,
  viewAllJobData,
  viewAlumniJob,
  alumniDeleteJobPost,
  AdminRemoveJobPost,
  AdminViewJobPost,
  viewJobData,
  updateJobPost,
} from "./job.controller.js";

export {
  adminRemoveForum,
  alumniAddForum,
  alumniForumList,
  alumniUpdateForum,
  forumChat,
  getAdminForumList,
  getAllForumList,
  joinForum,
  getJoinedForum,
  deleteForum,
  getForum,
  getAllForumChat
} from "./forum.controller.js";
