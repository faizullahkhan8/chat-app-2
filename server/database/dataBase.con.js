import mongoose from "mongoose";
import { MONGO_DB_URI } from "../config/env.config.js";

export const connectDB = async () => {
    try {
        await mongoose
            .connect(MONGO_DB_URI)
            .then(console.log("[DATABASE] Connected Succesfully"));
    } catch (error) {
        console.log("[DATABASE] ", error.message);
    }
};
