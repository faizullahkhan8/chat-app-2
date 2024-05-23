import React, { useEffect, useState } from "react";
import { getUserApi } from "../../../API/user.request";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../../../redux-store/Slices/conversation.slice.js";

const SingleConver = ({ conversation, currentUser }) => {
    const receiverId = conversation.members.find(
        (id) => currentUser._id !== id
    );
    const [user, setUser] = useState(null);

    const selectedConversation = useSelector((state) => state.conversation._id);

    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getUserApi(receiverId);
                if (result.status === 200) {
                    setUser(result.data.user);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (receiverId) getUser();

        return () => setUser(null);
    }, [receiverId]);

    const handleConversationClick = () => {
        dispatch(setConversation({ _id: conversation._id, receiverId }));
    };

    return (
        <div
            onClick={handleConversationClick}
            className={`flex items-center justify-center gap-2 mt-2 ${
                selectedConversation === conversation._id && "bg-orange-500"
            } rounded-md p-1 cursor-pointer hover:shadow hover:shadow-orange-500`}
        >
            <div
                className="flex items-center justify-center w-12 h-12 rounded-full border border-orange-500"
                style={{ backgroundColor: "rgb(248, 243, 230)" }}
            >
                <p className="text-xl font-bold text-orange-500">
                    {user?.username[0]?.toUpperCase()}
                </p>
            </div>
            <div className="flex-1 font-bold max-md:hidden">
                <p className="lg:text-xl "> {user?.name} </p>
                <p className="md:text-md">
                    {conversation.isOnline ? "online" : "offline"}
                </p>
            </div>
        </div>
    );
};

export default SingleConver;
