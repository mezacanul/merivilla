import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action)=>{
            return action.payload
        },
        unsetUser: (state, action) => {
            return {}
        } 
    },
});

// Export the actions
export const { setUser, unsetUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
