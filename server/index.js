// [MONGO DB CONNECTION FUNCTION]
import { connectDB } from "./database/dataBase.con.js";

// [ENV IMPORTS ]
import { PORT } from "./config/env.config.js";

// [ROUTER IMPORTS]
import authRouter from "./router/auth.router.js";
import chatRouter from "./router/chat.router.js";

// [PACKAGE IMPORTS]
import Express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";

// [EXPRESS INSTANCE]
const app = Express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["POST", "GET", "DELETE", "PUT"],
    },
});

// [FOR SENDING JSON IN RESPONSE]
app.use(Express.json());
app.use(cookieParser());
app.use(
    cors({
        methods: ["POST", "GET", "DELELT", "PUT"],
        origin: "*",
        credentials: true,
    })
);

// [ROUTER MIDDLEWARES]
app.use("/api/auth/", authRouter);
app.use("/api/chat/", chatRouter);

// [SOCKET LOGIC]
io.on("connection", (client) => {
    console.log(`New client is Connnected => ${client.id}`);

    client.on(
        "disconnect",
        console.log(`N client is disConnnected => ${client.id}`)
    );
});

// [CREATING SERVER]
server.listen(PORT, () => {
    console.log(`[SERVER] Running on ${PORT}`);
    connectDB();
});
