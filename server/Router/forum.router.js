import {
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
  getAllForumChat,
  getAllForumListIfLogin,
} from "../Controller/index.js";

import { getAuth, verifyAdmin, verifyAlumni } from "../Middleware/index.js";

export const forumRouter = (router) => {
  router.route("/alumni/addForum").post(getAuth, verifyAlumni, alumniAddForum);

  router
    .route("/alumni/viewMyForum")
    .get(getAuth, verifyAlumni, alumniForumList);

  router
    .route("/alumni/updateForum")
    .post(getAuth, verifyAlumni, alumniUpdateForum);

  router.route("/alumni/joinForum").post(getAuth, verifyAlumni, joinForum);

  router.route("/alumni/getAllForum").get(getAllForumList);

  router
    .route("/alumni/auth/getAllForum")
    .get(getAuth, verifyAlumni, getAllForumListIfLogin);
  router
    .route("/alumni/getAllJoinedForum")
    .get(getAuth, verifyAlumni, getJoinedForum);

  router.route("/alumni/deleteForum").post(getAuth, verifyAlumni, deleteForum);

  router.route("/alumni/getForum").post(getForum);

  router
    .route("/alumni/getAllForumChat")
    .post(getAuth, verifyAlumni, getAllForumChat);

  router.route("/alumni/sendChat").post(getAuth, verifyAlumni, forumChat);

  router
    .route("/admin/getAllForum")
    .get(getAuth, verifyAdmin, getAdminForumList);

  router
    .route("/admin/removeForum")
    .post(getAuth, verifyAdmin, adminRemoveForum);

  // router.route("/")
};
