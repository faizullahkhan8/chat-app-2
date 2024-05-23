import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const currentUser = useSelector((state) => state.user);

    return (
        <div className="">
            <div
                className={`${
                    message.receiverId === currentUser._id
                        ? "float-left"
                        : "float-right"
                } bg-orange-500 p-2 rounded-md mb-2 text-white font-bold leading-4`}
            >
                {message.text}
            </div>
        </div>
    );
};

export default Message;
