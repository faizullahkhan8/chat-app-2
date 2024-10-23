import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

export const socketContext = createContext({
    socket: null,
    onlineUsers: [],
});

export const SocketContextProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    const currentUserId = useSelector((state) => state.user._id);
    useEffect(() => {
        const connectSocket = () => {
            const socket = io("http://localhost:8800", {
                query: {
                    userId: currentUserId,
                },
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (param) => {
                setOnlineUsers(param);
            });
        };

        if (currentUserId) connectSocket();

        return () => socket?.close();
    }, [currentUserId, setOnlineUsers]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};
