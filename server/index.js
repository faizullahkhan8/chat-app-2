// [MONGO DB CONNECTION FUNCTION]
import { connectDB } from "./database/dataBase.con.js";

// [ENV IMPORTS ]
import { PORT } from "./config/env.config.js";

// [ROUTER IMPORTS]
import authRouter from "./router/auth.router.js";
import chatRouter from "./router/chat.router.js";
import messageRouter from "./router/message.router.js";
import userRouter from "./router/user.router.js";

// [PACKAGE IMPORTS]
import Express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// [EXPRESS INSTANCE]
const app = Express();

// [FOR SENDING JSON IN RESPONSE]
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);
app.use(Express.json({ limit: "50mb" }));
app.use(cookieParser());

// [ROUTER MIDDLEWARES]
app.use("/api/auth/", authRouter);
app.use("/api/chat/", chatRouter);
app.use("/api/message/", messageRouter);
app.use("/api/user/", userRouter);

// [SOCKET LOGIC]

// [CREATING SERVER]
app.listen(PORT, () => {
    console.log(`[SERVER] Running on ${PORT}`);
    connectDB();
});
