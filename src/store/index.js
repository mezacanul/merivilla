import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from "./slices/blocksSlice";
import newBlogReducer from "./slices/newBlogSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        blocks: blocksReducer,
        newBlog: newBlogReducer,
        user: userReducer
    },
});
