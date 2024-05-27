import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../../redux-store/Slices/user.slice.js";

import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import { LoginApi } from "../../API/auth.request";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const getUserData = (e) => {
        setData((previous) => ({ ...previous, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const result = await LoginApi(data);

            if (result?.status === 200) {
                dispatch(setUser(result?.data?.user));

                toast.success("Login succesfully");
                navigate("/");
            }
        } catch (error) {
            if (error.response.data.error) {
                toast.error(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/2 flex items-center justify-center flex-col gap-4 h-auto border border-orange-600 rounded-lg p-4 shadow-md hover:shadow-orange-300"
            >
                <Heading size="lg">Login</Heading>
                <Input
                    onChange={getUserData}
                    id="username"
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Username..."
                />
                <Input
                    onChange={getUserData}
                    id="password"
                    style={{ width: "100%" }}
                    type="password"
                    placeholder="Password..."
                />
                <Button
                    style={{ width: "100%" }}
                    varients="default"
                    type="submit"
                >
                    {loading ? "Loading" : "Login"}
                </Button>
                Not have an account yet !
                <Link to={"/register"} className="w-full text-center">
                    <Button style={{ width: "100%" }} varients="ghoost">
                        Register
                    </Button>
                </Link>
            </form>
        </div>
    );
};

export default Login;
