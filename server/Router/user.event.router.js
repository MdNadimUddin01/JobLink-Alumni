import { getAllEvent } from "../Controller/index.js";

export const userEventRouter = (route) => {
    
    route.route("/user/getAllEvents").get(getAllEvent);
    
}