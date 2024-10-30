import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post"
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model('User', userSchema);

export default User;
