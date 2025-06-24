import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        cacheStoreUser: (state, action) => {
            if(!action.payload) return false;
            state.users.push(action.payload);
        },
    }
});

export const {cacheStoreUser} = userSlice.actions;

export default userSlice.reducer;