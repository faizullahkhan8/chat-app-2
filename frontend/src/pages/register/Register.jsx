import React, { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import { RegisterApi } from "../../API/auth.request";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const getUserData = (e) =>
        setData((pre) => ({
            ...pre,
            [e.target.id]: e.target.value,
        }));

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await RegisterApi(data);
            console.log(result);
        } catch (error) {
            console.log("[ERROR IN REGISTER]", error.message);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/2 flex items-center justify-center flex-col gap-4 h-auto border border-orange-600 rounded-lg p-4 shadow-md hover:shadow-orange-300"
            >
                <Heading size="lg">Register</Heading>
                <Input
                    autoComplete="off"
                    type="text"
                    placeholder="Name..."
                    id="name"
                    onChange={getUserData}
                />
                <Input
                    autoComplete="off"
                    type="text"
                    placeholder="Username..."
                    id="username"
                    onChange={getUserData}
                />
                <Input
                    autoComplete="off"
                    type="password"
                    placeholder="Password..."
                    id="password"
                    onChange={getUserData}
                />
                <Input
                    autoComplete="off"
                    type="password"
                    placeholder="Confirm Password..."
                    id="confirmPassword"
                    onChange={getUserData}
                />
                <div className="w-11/12 flex items-center justify-evenly">
                    <div>
                        <input
                            type="checkbox"
                            name="gender"
                            id="male"
                            className="mr-2 drop-shadow-lg"
                            value="male"
                            checked={data.gender === "male"}
                            onChange={(e) => {
                                setData((pre) => ({
                                    ...pre,
                                    gender: "male",
                                }));
                            }}
                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="gender"
                            id="female"
                            className="mr-2 drop-shadow-lg"
                            value="female"
                            checked={data.gender === "female"}
                            onChange={(e) => {
                                setData((pre) => ({
                                    ...pre,
                                    gender: "female",
                                }));
                            }}
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <p className="text-red-600 font-bold text-md">error !</p>
                <Button varients="default" type="submit">
                    Register
                </Button>
                Already have an account !
                <Link to={"/login"} className="w-full text-center">
                    <Button varients="ghoost">Login</Button>
                </Link>
            </form>
        </div>
    );
};

export default Register;
