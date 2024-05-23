import React, { useEffect, useState } from "react";
import SingleConversation from "./SingleConversation.jsx";
import { useSelector } from "react-redux";
import { getChats } from "../../../API/chat.requests.js";

const Conversations = () => {
    const currentUser = useSelector((state) => state.user);

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getChats();

                if (result.status === 200) {
                    setConversations(result.data.chats);
                    //     setConversations(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        })();

        return () => setConversations([]);
    }, []);

    return (
        <div className="">
            {conversations?.map((conversation) => {
                return (
                    <SingleConversation
                        key={conversation._id}
                        conversation={conversation}
                        currentUser={currentUser}
                    />
                );
            })}
        </div>
    );
};

export default Conversations;
