import { configureStore } from "@reduxjs/toolkit";

import user from "./Slices/user.slice.js";
import conversation from "./Slices/conversation.slice.js";

const store = configureStore({
    reducer: { user, conversation },
});

export default store;
