import { model, Schema, SchemaTypes } from "mongoose";

const tokenSchema = new Schema(
    {
        token: { type: String, required: true },
        userId: { type: SchemaTypes.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const tokenModel = model("Token", tokenSchema, "Token");

export default tokenModel;
