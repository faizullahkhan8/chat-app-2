import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";

const Messages = ({ messages }) => {
    const chatId = useSelector((state) => state.conversation._id);

    const scroll = useRef();

    useEffect(() => {
        setTimeout(() => {
            scroll.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="flex-1 flex flex-col overflow-y-scroll">
            {chatId ? (
                messages.length > 1 ? (
                    messages.map((message) => {
                        return (
                            <div key={message._id} ref={scroll}>
                                <Message message={message} />;
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-xl">No message yet!</div>
                )
            ) : (
                <div className="text-center text-xl">
                    Select conversation to get start !
                </div>
            )}
        </div>
    );
};

export default Messages;
