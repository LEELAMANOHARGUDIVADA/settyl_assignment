import Message from "../models/messageSchema.js";


const addMessage = async(req,res) => {
    try {
        const { chatId, senderId, text } = req.body;

        const message = new Message({
            chatId,
            senderId,
            text
        })

        const result = await message.save();
        return res.status(201).json({ result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMessage = async(req,res) => {
    try {
        const { chatId } = req.params;

        const result = await Message.find({ chatId });
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { addMessage, getMessage };