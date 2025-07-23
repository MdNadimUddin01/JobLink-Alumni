import {
  adminAddEventConroller,
  adminDeleteEventcontroller,
  adminUpdateEventController
} from "../Controller/index.js";

import { getAuth, verifyAdmin } from "../Middleware/auth.js";

export const adminEventRouter = (router) => {
  router
    .route("/admin/addEvent")
    .post(getAuth, verifyAdmin, adminAddEventConroller);

  // router.route("/admin/getAllEvent").post(getAuth, verifyAdmin, getAllEvent);

  router
    .route("/admin/deleteEvent")
    .post(getAuth, verifyAdmin, adminDeleteEventcontroller);

  router
    .route("/admin/updateEvent/:eventId")
    .put(getAuth, verifyAdmin, adminUpdateEventController);
  
};
