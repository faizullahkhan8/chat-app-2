import React from "react";
import Leftbar from "../../components/Leftbar/Leftbar.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";

const Home = () => {
    return (
        <div className="flex gap-2">
            <Leftbar />
            <Chatbox />
        </div>
    );
};

export default Home;
