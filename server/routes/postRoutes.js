import { Router } from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, likePost } from "../controllers/postController.js";
import { getPostComments, commentPost, deleteComment } from "../controllers/commentController.js";
import upload from "../middlewares/multer.config.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.post('/create-post', upload.single("file"), authMiddleware, createPost);
router.post('/create-comment', authMiddleware, commentPost);
router.get('/allPostComments/:id', getPostComments);
router.delete('/delete-comment/:id',authMiddleware, deleteComment);
router.delete('/delete-post/:id', authMiddleware, deletePost);
router.post('/like-post', authMiddleware, likePost);
router.get('/comments', getPostComments);
router.get('/getAllPosts', getAllPosts);
router.get('/getSinglePost/:id', getSinglePost);

export default router;