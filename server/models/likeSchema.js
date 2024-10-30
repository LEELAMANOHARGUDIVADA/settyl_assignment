import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
}, { timestamps: true });

const Like = new mongoose.model("Like", LikeSchema);

export default Like;