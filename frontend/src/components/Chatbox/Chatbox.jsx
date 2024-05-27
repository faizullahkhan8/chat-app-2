import { useEffect, useState } from "react";
import Seperator from "../Seperator/Seperator.jsx";
import Nav from "./sub-components/Nav.jsx";
import Messages from "./sub-components/Messages.jsx";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import { useSelector } from "react-redux";
import { getMessagesApi, sendMessagesApi } from "../../API/message.request.js";
import { toast } from "react-toastify";

const Chatbox = () => {
    const conversation = useSelector((state) => state.conversation);

    const [sendMessage, setSendMessage] = useState("");

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const result = await getMessagesApi(conversation._id);
                if (result.status === 200) {
                    setMessages(result.data.messages);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        };

        if (conversation?._id) getMessages();

        return () => setMessages([]);
    }, [conversation?._id, setMessages]);

    const handleSendMessage = async () => {
        const data = {
            chatId: conversation._id,
            receiverId: conversation.receiverId,
            text: sendMessage,
        };

        try {
            const result = await sendMessagesApi(data);

            if (result.status === 201) {
                console.log(result.data);
                setMessages((pre) => [...pre, result.data.message]);
                setSendMessage("");
                toast.success("message sent succesfully!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-[84vh] flex flex-col flex-1 border border-slate-500 rounded-md p-2 bg-white">
            <Nav />
            <Seperator />
            <Messages messages={messages} />
            {conversation._id && (
                <div className="flex gap-2">
                    <Input
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                        style={{ width: "100%" }}
                        placeholder="Send a message..."
                    />
                    <Button
                        onClick={handleSendMessage}
                        varients="default"
                        style={{ width: "5rem" }}
                    >
                        Send
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Chatbox;
