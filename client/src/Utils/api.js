const BASE_URL = "http://localhost:3000/api";

export const eventEndpoints = {
  ADD_EVENT: BASE_URL + "/admin/addEvent",
  GET_ALL_EVENT_DATA: BASE_URL + "/user/getAllEvents",
  DELETE_EVENT: BASE_URL + "/admin/deleteEvent",
};

export const endpoints = {
  SIGN_UP: BASE_URL + "/alumni/signUp",
  LOGIN: BASE_URL + "/user/signIn",
  ALUMNI_DATA: BASE_URL + "/getAlumniData",
};

export const admin = {
  ALUMNI_DATA: BASE_URL + "/admin/getAlumniData",
  VERIFY_ALUMNI_EMAIL: BASE_URL + "/admin/verifyAlumniEmail",
};

export const jobEndPoints = {
  ADD_JOB: BASE_URL + "/alumni/addJobPost",
  VIEW_ALL_JOB: BASE_URL + "/viewAlljobs",
  VIEW_MY_JOBS: BASE_URL + "/alumni/viewMyJobs",
  DELETE_JOB: BASE_URL + "/alumni/deleteJobPost",
  REMOVE_JOB_POST: BASE_URL + "/admin/removeJobPost",
  ADMIN_VIEW_JOBS: BASE_URL + "/admin/viewJobPost",
  VIEW_JOB_DATA: BASE_URL + "/viewJob",
  UPDATE_JOB_POST: BASE_URL + "/alumni/updateJob",
};
