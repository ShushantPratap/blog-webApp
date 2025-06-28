import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savePosts: []
}

const postSaveSlice = createSlice({
    name: "savePost",
    initialState,
    reducers: {
        savePost: (state, action) => {
            if(!action.payload) return false;
            state.savePosts.push(action.payload);
        },
        removeSavePost: (state, action) => {
            state.savePosts = state.savePosts.filter(id => id !== action.payload);
        }
    }
});

export const {savePost, removeSavePost} = postSaveSlice.actions;

export default postSaveSlice.reducer;