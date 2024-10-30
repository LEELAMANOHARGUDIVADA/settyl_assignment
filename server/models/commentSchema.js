import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, {
    timestamps: true
});

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;