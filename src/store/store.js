import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import userSlice from './userSlice';
import postSaveSlice from './postSaveSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        user: userSlice,
        savePosts: postSaveSlice
        // TODO: Add more slices here for posts
    }
    
});

export default store;