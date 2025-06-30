import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "../Slices";



export const store = configureStore({
  reducer: {
    profile : profileReducer
  }
})