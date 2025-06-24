import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        cacheStorePosts: (state, action) => {
            if(!action.payload) return false;
            state.posts.push(action.payload);
        },
        deleteCachePost: (state, action) => {
            state.posts = state.posts.filter(post => post.$id !== action.payload);
        }
    }
});

export const {cacheStorePosts, deleteCachePost} = postSlice.actions;

export default postSlice.reducer;