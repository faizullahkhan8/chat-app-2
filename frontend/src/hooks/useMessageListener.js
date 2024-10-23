import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { socketContext } from "../contexts/Socket.context";

export const useMessageListener = ({ setMessages }) => {
    const { socket } = useContext(socketContext);
    const currentUser = useSelector((state) => state.user._id);
    useEffect(() => {
        function MessageListener() {
            socket?.on("receiveMessage", (message) => {
                setMessages((pre) => [...pre, message]);
                if (message.sender !== currentUser) {
                    toast.success("New Message");
                }
            });
        }

        if (socket) MessageListener();

        return () => socket.off("receiveMessage");
    }, [socket, setMessages]);
};
