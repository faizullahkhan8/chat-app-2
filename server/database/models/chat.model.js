import { Schema, SchemaTypes, model } from "mongoose";

const chatSchema = new Schema(
    {
        members: { type: SchemaTypes.Array, required: true },
    },
    { timestamps: true }
);

const chatModel = model("Chat", chatSchema, "Chat");

export default chatModel;
