import React from "react";

import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-1/2 flex items-center justify-center flex-col gap-4 h-auto border border-orange-600 rounded-lg p-4 shadow-md hover:shadow-orange-300"
            >
                <Heading size="lg">Login</Heading>
                <Input type="text" placeholder="Username..." />
                <Input type="password" placeholder="Password..." />
                <p className="text-red-600 font-bold text-md">error !</p>
                <Button varients="default">Login</Button>
                Not have an account yet !
                <Link to={"/register"} className="w-full text-center">
                    <Button varients="ghoost">Register</Button>
                </Link>
            </form>
        </div>
    );
};

export default Register;
