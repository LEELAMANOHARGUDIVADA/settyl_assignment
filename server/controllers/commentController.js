import Comment from "../models/commentSchema.js";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";
import { sendCommentNotification } from "../utils/notificationHandler.js";

//COMMENTPOST
const commentPost = async (req, res) => {
    try {
      const { commentText, postId } = req.body;
      const userId = req.user.id;
  
      if (!commentText || !userId || !postId) {
        return res.status(400).json({ message: "Provide All Details" });
      }
  
      const post = await Post.findById(postId).populate("userId");
      if (!post) {
        return res.status(400).json({ Error: "POST NOT FOUND!" });
      }
      const user = await User.findById(userId);
  
      const comment = new Comment({
        commentText,
        userId,
        postId,
      });
      const savedComment = await comment.save();
  
      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: savedComment,
        },
      });

      const emailError = await sendCommentNotification({ email: post.userId.email, name: post.userId.name, user: user.name });

        if (emailError) {
            return res.status(500).json({ message: "Commented On Post, but notification failed." });
        }

  
      return res.status(201).json({ message: "Commented!", savedComment });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  };

  //FETCH COMMENTS

const getPostComments = async(req,res) => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ postId: id }).populate("userId").sort({ createdAt: -1 });

        if(!comments) {
            return res.status(400).json({ message: "POST NOT FOUND" });
        }

        return res.status(200).json({ message: "Fetched Comments", comments });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

//DELETE COMMENT

const deleteComment = async(req,res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const comment = await Comment.findByIdAndDelete(id);
        console.log(comment);
        await Post.findByIdAndUpdate(comment.postId, {
            $pull: {
                comments: id
            }
        });

        return res.status(200).json({ message: "Comment Deleted!" });

    } catch (error) {
      console.log(error);
        return res.status(500).json({ Error: error.message });
    }
}

export  { getPostComments, commentPost, deleteComment };