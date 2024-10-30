import Message from "../models/messageSchema.js";

const chatHistory = async(req,res) => {
    const { userId, receiverId } = req.params;
    try {
        const chatHistory = await Message.find({
            $or: [
                { senderId: userId, receiverId },
                { senderId: receiverId, receiverId: userId },
            ],
        }).sort({ timestamp: 1 });
        return res.status(200).json(chatHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { chatHistory };