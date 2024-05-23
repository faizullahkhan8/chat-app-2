import { useState } from "react";
import Seperator from "../Seperator/Seperator.jsx";
import Nav from "./sub-components/Nav.jsx";
import Messages from "./sub-components/Messages.jsx";
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import { useSelector } from "react-redux";
import { sendMessagesApi } from "../../API/message.request.js";
import { toast } from "react-toastify";

const Chatbox = () => {
    const conversation = useSelector((state) => state.conversation);

    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        const data = {
            chatId: conversation._id,
            receiverId: conversation.receiverId,
            text: message,
        };

        try {
            const result = await sendMessagesApi(data);

            if (result.status === 201) {
                setMessage("");
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
            <Messages />
            {conversation._id && (
                <div className="flex gap-2">
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
