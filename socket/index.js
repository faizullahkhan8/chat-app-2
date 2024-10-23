import { Server } from "socket.io";

const io = new Server(8800, {
    cors: "http://localhost:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        onlineUsers[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("sendMessage", (message) => {
        const receiverId = onlineUsers[message.receiverId];
        io.to(receiverId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        delete onlineUsers[userId];

        io.emit("getOnlineUsers", onlineUsers);
    });
});
