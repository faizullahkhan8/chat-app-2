import React from "react";
import { useSelector } from "react-redux";
import timesago from "timesago";

const Message = ({ message }) => {
    const currentUser = useSelector((state) => state.user);

    return (
        <div className="">
            <div
                className={`${
                    message.receiverId === currentUser._id
                        ? "float-left bg-sky-500"
                        : "float-right  bg-orange-500"
                }  p-2 rounded-md mb-2`}
            >
                <p className=" text-white font-semibold">{message.text}</p>
                <p className="text-slate-200">{timesago(message.createdAt)}</p>
            </div>
        </div>
    );
};

export default Message;
