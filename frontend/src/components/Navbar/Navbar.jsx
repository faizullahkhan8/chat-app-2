import React from "react";
import Heading from "../Heading/Heading.jsx";

import Profile from "./Profile.jsx";

const Navbar = () => {
    return (
        <div className="w-full pt-1 flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <div>
                    <Heading size="md">Chat-app</Heading>
                </div>
            </div>
            <div className="relative flex gap-2">
                <Profile />
            </div>
        </div>
    );
};

export default Navbar;
