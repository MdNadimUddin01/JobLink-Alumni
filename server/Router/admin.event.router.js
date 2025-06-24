import { adminUpdateEventController } from "../Controller/admin.event.controller.js";
import {
  adminAddEventConroller,
  adminDeleteEventcontroller,
  getAllEvent,
} from "../Controller/index.js";
import { getAuth, verifyAdmin } from "../Middleware/auth.js";

export const eventRouter = (router) => {
  router
    .route("/admin/addEvent")
    .post(getAuth, verifyAdmin, adminAddEventConroller);

  router.route("/admin/getAllEvent").post(getAuth, verifyAdmin, getAllEvent);

  router
    .route("/admin/deleteEvent/:eventId")
    .post(getAuth, verifyAdmin, adminDeleteEventcontroller);

  router
    .route("/admin/updateEvent/:eventId")
    .put(getAuth, verifyAdmin, adminUpdateEventController);
};
