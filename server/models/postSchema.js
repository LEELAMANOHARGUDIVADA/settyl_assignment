import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    postContent: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        // required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
            required: true
        },
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        }
    ]
}, {
    timestamps: true
});

const Post = new mongoose.model("Post", postSchema);

export default Post;