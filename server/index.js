// [PACKAGE IMPORTS]
import Express from "express";

// [MONGO DB CONNECTION FUNCTION]
import { connectDB } from "./database/dataBase.con.js";

// [ENV IMPORTS ]
import { PORT } from "./config/env.config.js";

// [ROUTER IMPORTS]
import authRouter from "./router/auth.router.js";

// [EXPRESS INSTANCE]
const app = Express();

// [FOR SENDING JSON IN RESPONSE]
app.use(Express.json());

// [ROUTER MIDDLEWARES]
app.use("/api/auth/", authRouter);

// [CREATING SERVER]
app.listen(PORT, () => {
    console.log(`[SERVER] Running on ${PORT}`);
    connectDB();
});
