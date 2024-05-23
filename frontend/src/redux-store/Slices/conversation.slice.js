import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    receiverId: "",
};

export const conversation = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversation: (state, action) => {
            state._id = action.payload._id;
            state.receiverId = action.payload.receiverId;
        },
        resetConversation: (state, action) => {
            state._id = "";
            state.receiverId = "";
        },
    },
});

export const { setConversation, resetConversation } = conversation.actions;

export default conversation.reducer;
