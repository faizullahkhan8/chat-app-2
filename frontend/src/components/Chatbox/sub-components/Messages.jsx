import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMessagesApi } from "../../../API/message.request.js";
import Message from "./Message.jsx";

const Messages = () => {
    const chatId = useSelector((state) => state.conversation._id);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const result = await getMessagesApi(chatId);
                if (result.status === 200) {
                    setMessages(result.data.messages);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        };

        if (chatId) getMessages();

        return () => setMessages([]);
    }, [chatId]);

    return (
        <div className="flex-1 flex flex-col overflow-y-scroll">
            {chatId ? (
                messages.length > 1 ? (
                    messages.map((message) => {
                        return <Message key={message._id} message={message} />;
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
