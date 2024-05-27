const io = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    console.log(socket._id);

    socket.on("disconnect", () => {
        console.log("disconnected", socket._id);
    });
});
