import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/chat",
    withCredentials: true,
});

// GET USER CHATS/CONVERSATIONS

export const getChats = async () => {
    return await API.get("/");
};
