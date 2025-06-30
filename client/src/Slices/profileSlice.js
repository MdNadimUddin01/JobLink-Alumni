import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:  JSON.parse(localStorage.getItem("user")),
    loading : false,
}

export const profileSlice = createSlice({
    name:"Profile",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setLoading, setToken, setUser } = profileSlice.actions

export default profileSlice.reducer