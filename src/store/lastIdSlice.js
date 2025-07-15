import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: ""
}

const lastIdSlice = createSlice({
    name: "lastId",
    initialState,
    reducers: {
        lastId: (state, action) => {
            if(!action.payload) return false;
            state.id = action.payload;
        }
    }
});

export const { lastId } = lastIdSlice.actions;

export default lastIdSlice.reducer;