import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/message",
    withCredentials: true,
});

export const sendMessagesApi = async (data) => {
    return await API.post("/", data);
};

export const getMessagesApi = async (chatId) => {
    return await API.get(`/${chatId}`);
};
