
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alumniMyForum: [],
  alumniJoinedForum: [],
};

export const forumSlice = createSlice({
    name: "Forum",
    initialState,
    reducers: {
        setMyForm: (state, action) => {
            state.alumniMyForum = action.payload
        },
        setJoinedForum: (state, action) => {
            state.alumniJoinedForum = action.payload
        }
    }
});


export const { setMyForm  , setJoinedForum} = forumSlice.actions;

export default forumSlice.reducer;