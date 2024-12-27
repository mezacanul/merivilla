import { createSlice } from "@reduxjs/toolkit";

const newBlogSlice = createSlice({
    name: "newBlog",
    initialState: {
        title: "",
        category: "",
        description: "",
        coverImage: "",
        author: "Creativo"
    },
    reducers: {
        updateNewBlog: (state, action)=>{
            switch (action.payload.attr) {
                case "title":
                    state.title = action.payload.content
                    break;
                case "category":
                    state.category = action.payload.content
                    break;
                case "description":
                    state.description = action.payload.content
                    break;
                case "coverImage":
                    state.coverImage = action.payload.content
                    break;
                case "author":
                    state.author = action.payload.content
                    break;
                default: break;
            }
        },
    },
});

// Export the actions
export const { updateNewBlog } = newBlogSlice.actions;

// Export the reducer
export default newBlogSlice.reducer;
