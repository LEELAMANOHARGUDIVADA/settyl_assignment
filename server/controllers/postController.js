import mongoose from "mongoose";
import Comment from "../models/commentSchema.js";
import Like from "../models/likeSchema.js";
import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

//CREATE POST
const createPost = async (req, res) => {
  try {
    const { postContent } = req.body;
    console.log(req.file);

    const userId = req.user.id;
    if (!postContent || !userId || !req.file) {
      return res.status(400).json({ message: "Provide All Details" });
    }

    const post = new Post({
      postContent,
      userId,
      postUrl: req.file.path,
    });

    const savedPost = await post.save();

    await User.findByIdAndUpdate(userId, {
      $push: {
        posts: savedPost,
      },
    });

    return res.status(201).json({ message: "Post Created!", savedPost });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

//LIKEPOST
const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "Provide all credentials" });
    }

    const userLiked = await Like.findOne({ userId, postId });
    
    if (userLiked) {
      await Like.findByIdAndDelete(userLiked._id);
      await Post.findByIdAndUpdate(userLiked.postId, {
        $pull: { likes: userId },
      });
      return res.status(200).json({ message: "Unliked" });
    }

    //create Like
    const postIsLiked = new Like({
      userId,
      postId,
    });
    await postIsLiked.save();
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });

    return res.status(201).json({ message: "Liked", postIsLiked });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

//GET ALL POSTS
const getAllPosts = async(req,res) => {
  try{
    const posts = await Post.find({}).populate("userId").sort({ createdAt: -1 });

    return res.status(200).json({ message: "Fetched Posts", posts });
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
}

// GET SINGLE POST

const getSinglePost = async(req,res) => {
  try {
    const {id} = req.params;
    
    const post = await Post.findById(id).populate("userId");
    // console.log(post);

    return res.status(200).json({message: "Fetched!", post});
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
}

// DELETE POST

const deletePost = async(req,res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if(!post) return res.status(404).json({ message: "Post Not Found!" });

    return res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    return res.status.json({ Error: error.message });
  }
}


export { createPost, likePost, getAllPosts, getSinglePost, deletePost };
