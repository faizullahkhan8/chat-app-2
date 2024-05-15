// [MODEL IMPORTS]
import chatModel from "../database/models/chat.model.js";
import userModel from "../database/models/user.model.js";

// [CREATE NEW CONVERSATION]
export const createChat = async (req, res, next) => {
    const senderId = req.userId;
    const { receiverId } = req.body;
    try {
        const isUserExists = await userModel.findOne({ _id: receiverId });

        if (!isUserExists) {
            return res.status(500).json({ error: "invalid receiverId" });
        }

        const isChatAlreadyExists = await chatModel.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (isChatAlreadyExists) {
            return res.status(200).json({ error: "chat already exists" });
        }

        const newChat = new chatModel({
            members: [senderId, receiverId],
        });

        await newChat.save();

        return res.status(201).json({ chat: newChat });
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server error" }),
            console.log("[ERROR IN CHAT CONTROLLER]", error.message)
        );
    }
};
// [FIND CONVERSATION OF THE PARTICULAR USER]
export const userChats = async (req, res, next) => {
    const senderId = req.userId;
    try {
        const userChats = await chatModel.find({
            members: { $in: [senderId] },
        });

        console.log(userChats);

        if (userChats.length < 1) {
            return res.status(404).json({ error: "No chats found" });
        }

        return res.status(200).json({ chats: userChats });
    } catch (error) {
        res.status(500).json({ error: "internal server error" }),
            console.log("[ERROR IN CHAT CONTROLLER]", error.message);
    }
};
// [FIND THE SPACIFIC CHATS OF THE USER]
export const findChat = async (req, res, next) => {
    const senderId = req.userId;
    const { receiverId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!chat) {
            return res.status(404).json({ error: "chat not found" });
        }

        return res.status(200).json({ chat });
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server error" }),
            console.log("[ERROR IN CHAT CONTROLLER]", error.message)
        );
    }
};
