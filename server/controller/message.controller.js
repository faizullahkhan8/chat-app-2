import messageModel from "../database/models/message.model.js";

export const sendMessage = async (req, res) => {
    const senderId = req.userId;
    const { chatId, receiverId, text } = req.body;

    try {
        const newMessage = new messageModel({
            chatId,
            senderId,
            receiverId,
            text,
        });

        await newMessage.save();

        return res.status(201).json({ message: newMessage });
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server error" }),
            console.log("[ERROR IN MESSAGE CONTROLLER]", error.message)
        );
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;

    if (chatId.length < 24 || chatId.length > 24)
        return res.status(500).json({ error: "invalid chatId" });
    try {
        const messages = await messageModel.find({ chatId });

        if (messages.length < 1) {
            return res.status(404).json({ error: "messages are not found" });
        }

        return res.status(200).json({ messages });
    } catch (error) {
        return (
            res.status(500).json({ error: "internal server error" }),
            console.log("[ERROR IN MESSAGE CONTROLLER]", error.message)
        );
    }
};
