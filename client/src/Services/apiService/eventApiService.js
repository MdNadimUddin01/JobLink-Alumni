import { eventEndpoints } from "../../Utils/api";
import { apiCall } from "../apiConnector";

export const addEvent = async (eventData , navigate) => {

    try {
        
        const res = await apiCall("POST", eventEndpoints.ADD_EVENT, {event :eventData});

        console.log(res);

        if (res.status !== 200) {
            throw Error("Event Addition failed")
        }

        navigate("/admin/events");

    } catch (error) {
        console.log(error);
    }

};


export const getAllEventData = async () => {

    let result = [];
    try {
        
        const res = await apiCall("GET", eventEndpoints.GET_ALL_EVENT_DATA);
        if (res.status !== 200) {
            throw Error("Events Fethcing Failed")
        }

        result = res.data.events;

        // console.log(res);
    } catch (error) {
        console.log(error)
    }

    return result;
}

export const deleteEventData = async (eventId) => {
    
    try {
        // console.log("eventId : " , eventId)
        const res = await apiCall("POST", eventEndpoints.DELETE_EVENT, { eventId });

        if (res.status !== 200) {
            throw Error("Event deletion failed");
        }
        console.log("delete event res : " , res)
        
    } catch (error) {
        console.log(error);
    }
}