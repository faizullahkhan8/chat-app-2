import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlengt: 8 },
        gender: { type: String, required: true, enum: ["male", "female"] },
    },
    { timestamps: true }
);

const UserModel = model("User", userSchema, "User");

export default UserModel;
