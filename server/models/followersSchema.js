import mongoose from "mongoose"

const followersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    userToBeFollowed: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: true });

const Follow = new mongoose.model("Follow", followersSchema);

export default Follow;