import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String
    },
    timestamp: { type: Date, default: Date.now },
});

const Message = new mongoose.model("Message", messageSchema);

export default Message;