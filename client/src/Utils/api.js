

const BASE_URL = "http://localhost:3000/api";


export const eventEndpoints = {
  ADD_EVENT: BASE_URL + "/admin/addEvent",
  GET_ALL_EVENT_DATA: BASE_URL + "/user/getAllEvents",
  DELETE_EVENT : BASE_URL + "/admin/deleteEvent"
};

export const endpoints = {
  SIGN_UP: BASE_URL + "/alumni/signUp",
  LOGIN: BASE_URL + "/user/signIn",
};

export const admin = {
  ALUMNI_DATA: BASE_URL + "/admin/getAlumniData",
  VERIFY_ALUMNI_EMAIL: BASE_URL + "/admin/verifyAlumniEmail",
};

export const jobEndPoints = {
  ADD_JOB: BASE_URL + "/alumni/addJobPost",
};