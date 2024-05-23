import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const RegisterApi = async (data) => {
    if (registerVaidator(data)) {
        return await API.post("/auth/register/", data);
    }
};

export const LoginApi = async (data) => {
    if (loginVaidator(data)) {
        return await API.post("/auth/login/", data);
    }
};

export const LogoutApi = async () => {
    return await API.post("/auth/logout");
};

const registerVaidator = ({
    username,
    name,
    password,
    gender,
    confirmPassword,
}) => {
    if (!name || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (username.length < 8) {
        toast.error("Username must be 8 character long");
        return false;
    }

    if (password.length < 8) {
        toast.error("password must be 8 character long");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Confirm password must match with password");
        return false;
    }

    return true;
};

const loginVaidator = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (username.length < 8) {
        toast.error("Username must be 8 character long");
        return false;
    }

    if (password.length < 8) {
        toast.error("password must be 8 character long");
        return false;
    }

    return true;
};
