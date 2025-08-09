import {
  adminAddEventConroller,
  adminDeleteEventcontroller,
  adminUpdateEventController,
  getEventData
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
    .route("/admin/updateEvent")
    .post(getAuth, verifyAdmin, adminUpdateEventController);
  
  router.route("/getEvent").post(getEventData);
  
};
