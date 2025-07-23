const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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


export const forumEndpoints = {
  ADD_FORUM: BASE_URL + "/alumni/addForum",
  VIEW_ALUMNI_FORUM: BASE_URL + "/alumni/viewMyForum",
  ALUMNI_UPDATE_FORUM: BASE_URL + "/alumni/updateForum",
  ALUMNI_GET_ALL_FORUM: BASE_URL + "/alumni/getAllForum",

  ALUMNI_JOIN_FORUM: BASE_URL + "/alumni/joinForum",
  ALUMNI_GET_ALL_JOINED_FORUM: BASE_URL + "/alumni/getAllJoinedForum",
  ALUMNI_GET_FORUM: BASE_URL + "/alumni/getForum",
  ALUMNI_DELETE_FORUM: BASE_URL + "/alumni/deleteForum",

  ADMIN_GET_ALL_FORUM: BASE_URL + "/admin/getAllForum",
  ADMIN_REMOVE_FORUM: BASE_URL + "/admin/removeForum",

  GET_FORUM_CHAT: BASE_URL + "/alumni/getAllForumChat",
  SEND_FORUM_CHAT: BASE_URL + "/alumni/sendChat",
  
};