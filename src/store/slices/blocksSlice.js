import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, type: "heading", content: "" },
    { id: 2, type: "text", content: "" },
    { id: 3, type: "image", content: "" },
];

const blocksSlice = createSlice({
    name: "items",
    initialState: initialState,
    reducers: {
        addBlock: (state, action) => {
            // state.push(action.payload);
            state.unshift(action.payload);
        },
        updateBlocks: (state, action) => {
            return action.payload;
        },
        deleteBlock: (state, action) => {
            return state.filter((block) => block.id !== action.payload);
        },
    },
});

// Export the actions
export const { addBlock, deleteBlock, updateBlocks } = blocksSlice.actions;

// Export the reducer
export default blocksSlice.reducer;
