import React from "react";
import Seperator from "../Seperator/Seperator.jsx";
import Conversations from "./sub-components/Conversations.jsx";

const Leftbar = () => {
    return (
        <div className="w-1/4 h-[84vh] border border-slate-500 rounded-md p-2 bg-white truncate">
            <>
                <h1 className="md:text-2xl sm:text-xl text-lg font-bold">
                    <span className="text-2xl text-orange-500 mr-[1px]">C</span>
                    onversations
                </h1>
                <Seperator />
                <Conversations />
            </>
        </div>
    );
};

export default Leftbar;
