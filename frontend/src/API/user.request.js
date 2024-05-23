import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/user",
    withCredentials: true,
});

export const getUserApi = async (userId) => {
    return await API.get(`/${userId}`);
};
