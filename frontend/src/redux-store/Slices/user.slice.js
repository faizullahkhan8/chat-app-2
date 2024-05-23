import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    username: "",
    isAuth: false,
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.isAuth = true;
        },
        resetUser: (state, action) => {
            state._id = "";
            state.name = "";
            state.username = "";
            state.isAuth = false;
        },
    },
});

export const { setUser, resetUser } = user.actions;

export default user.reducer;
