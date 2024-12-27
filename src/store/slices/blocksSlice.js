import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: 1, type: "heading", content: "" },
    { id: 2, type: "text", content: "" },
    // { id: 3, type: "image", content: "" },
];

const blocksSlice = createSlice({
    name: "blocks",
    initialState: initialState,
    reducers: {
        addBlock: (state, action) => {
            // state.push(action.payload);
            state.unshift(action.payload);
        },
        updateBlockContent: (state, action) => {
            const block = state.find(item => item.id === action.payload.id);
            if (block) {
                block.content = action.payload.content;
                if (block.file) {
                    block.file = action.payload.file;
                }
            }
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
export const { addBlock, deleteBlock, updateBlocks, updateBlockContent } = blocksSlice.actions;

// Export the reducer
export default blocksSlice.reducer;
