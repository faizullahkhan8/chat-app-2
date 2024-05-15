import { Schema, SchemaTypes, model } from "mongoose";

const messageSchema = new Schema(
    {
        chatId: { type: SchemaTypes.ObjectId, ref: "Chat" },
        senderId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
        receiverId: { type: SchemaTypes.ObjectId, ref: "User", required: true },
        text: { type: SchemaTypes.String, required: true },
    },
    { timestamps: true }
);

const messageModel = model("Message", messageSchema, "Chat");

export default messageModel;
