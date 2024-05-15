import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const RegisterApi = async (data) => {
    return await API.post("/auth/register/", data);
};
