import {
  AdminRemoveJobPost,
  AdminViewJobPost,
  alumniDeleteJobPost,
  createJobPost,
  updateJobPost,
  viewAllJobData,
  viewAlumniJob,
  viewJobData,
} from "../Controller/index.js";
import { getAuth, verifyAdmin, verifyAlumni } from "../Middleware/auth.js";

export const alumniJobRouter = (router) => {
  router.route("/alumni/addJobPost").post(getAuth, verifyAlumni, createJobPost);

  router.route("/viewAlljobs").get(viewAllJobData);

  router.route("/viewJob").post(viewJobData);

  router.route("/alumni/viewMyJobs").get(getAuth, verifyAlumni, viewAlumniJob);

  router.route("/alumni/updateJob").post(getAuth, verifyAlumni , updateJobPost);

  router
    .route("/alumni/deleteJobPost")
    .post(getAuth, verifyAlumni, alumniDeleteJobPost);

  router
    .route("/admin/removeJobPost")
    .post(getAuth, verifyAdmin, AdminRemoveJobPost);

  router
    .route("/admin/viewJobPost")
    .get(getAuth, verifyAdmin, AdminViewJobPost);
};
