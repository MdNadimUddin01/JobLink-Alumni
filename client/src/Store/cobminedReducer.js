import { configureStore } from "@reduxjs/toolkit";
import { profileReducer ,forumReducer} from "../Slices";


export const store = configureStore({
  reducer: {
    profile: profileReducer,
    forum : forumReducer
  }
})